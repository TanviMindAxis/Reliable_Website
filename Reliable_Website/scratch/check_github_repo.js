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

async function run() {
    console.log('--- Checking GitHub Repo: MindAxis-Innovation-Private-Limited/Reliable_Website ---');
    try {
        const repo = await getJson('https://api.github.com/repos/MindAxis-Innovation-Private-Limited/Reliable_Website');
        console.log('Repo Status:', repo.status);
        if (repo.status === 200) {
            console.log('Repo full_name:', repo.data.full_name);
            console.log('Default branch:', repo.data.default_branch);
            console.log('Updated at:', repo.data.updated_at);
            console.log('Pushed at:', repo.data.pushed_at);
        } else {
            console.log('Repo response:', repo.data);
        }
    } catch(e) {
        console.error('Error fetching repo:', e.message);
    }

    try {
        const commits = await getJson('https://api.github.com/repos/MindAxis-Innovation-Private-Limited/Reliable_Website/commits?per_page=5');
        console.log('Commits Status:', commits.status);
        if (commits.status === 200 && Array.isArray(commits.data)) {
            console.log('Latest 5 commits on default branch:');
            commits.data.forEach(c => {
                console.log(`  sha: ${c.sha.substring(0,7)} | date: ${c.commit.author.date} | msg: ${c.commit.message.split('\n')[0]}`);
            });
        }
    } catch(e) {
        console.error('Error fetching commits:', e.message);
    }

    // Check if TanviMindAxis user has a repo
    console.log('--- Checking User: TanviMindAxis ---');
    try {
        const user = await getJson('https://api.github.com/users/TanviMindAxis/repos');
        console.log('TanviMindAxis repos status:', user.status);
        if (user.status === 200 && Array.isArray(user.data)) {
            console.log('TanviMindAxis repos:', user.data.map(r => r.full_name));
        }
    } catch(e) {
        console.error('Error fetching user repos:', e.message);
    }
}

run();
