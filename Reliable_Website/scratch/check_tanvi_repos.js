const https = require('https');

function getJson(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, {
            headers: {
                'User-Agent': 'NodeJS-Check',
                'Accept': 'application/vnd.github.v3+json'
            }
        }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ status: res.statusCode, headers: res.headers, data: JSON.parse(data) });
                } catch(e) {
                    resolve({ status: res.statusCode, headers: res.headers, data: data });
                }
            });
        });
        req.on('error', reject);
        req.setTimeout(10000, () => { req.destroy(); reject(new Error('timeout')); });
    });
}

async function inspectRepo(repoName) {
    console.log(`\n=== Inspecting: ${repoName} ===`);
    try {
        const repo = await getJson(`https://api.github.com/repos/${repoName}`);
        console.log('Status:', repo.status);
        if (repo.status === 200) {
            console.log('Default branch:', repo.data.default_branch);
            console.log('Pushed at:', repo.data.pushed_at);
            console.log('Clone URL:', repo.data.clone_url);
        }
        const commits = await getJson(`https://api.github.com/repos/${repoName}/commits?per_page=3`);
        if (commits.status === 200 && Array.isArray(commits.data)) {
            console.log('Latest commits:');
            commits.data.forEach(c => {
                console.log(`  sha: ${c.sha.substring(0,7)} | date: ${c.commit.author.date} | msg: ${c.commit.message.split('\n')[0]}`);
            });
        }
    } catch(e) {
        console.error('Error:', e.message);
    }
}

async function main() {
    await inspectRepo('TanviMindAxis/Reliable_Website');
    await inspectRepo('TanviMindAxis/reliable_website_');
}

main();
