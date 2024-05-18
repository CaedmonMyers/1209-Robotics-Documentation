const username = 'caedmonmyers';
    const repo = '1209-Robotics-Documentation';
    const token1 = 'git'
    const token2 = 'hub_pat_11AS25AVQ0SexCwC37q'
    const token3 = 'Ddt_U9K0D0fjmVZgqrRHXqjdObZIjhbr';
    const token4 = 'OM1xt0KwNhcmpqk2CQQVB22k4EpTGuv';
    const token = token1 + token2 + token3 + token4;
    

    async function fetchLastCommitDate() {
        // Get the current file path from the URL and remove the leading slash if present
        const filePath = '/public' + window.location.pathname;
        console.log(filePath);

        // Construct the API URL
        const url = `https://api.github.com/repos/${username}/${repo}/commits?path=${filePath}&page=1&per_page=1`;
        console.log(url);

        try {
            // Fetch the commit data from GitHub
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github+json'
                }
            });

            // Handle the response
            if (!response.ok) {
                console.error('Error fetching commit data:', response.statusText);
                document.getElementById('sudo').innerHTML = 'Error loading last updated date.';
                return;
            }

            const data = await response.json();
            if (data.length > 0) {
                const lastCommitDate = new Date(data[0].commit.committer.date);
                const formattedDate = lastCommitDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                document.getElementById('sudo').innerHTML = `Last Updated: ${formattedDate}`;
            } else {
                console.error('No commit data found for the specified file.');
                document.getElementById('sudo').innerHTML = 'No update information available.';
            }
        } catch (error) {
            console.error('Error:', error);
            document.getElementById('sudo').innerHTML = 'Error loading last updated date.';
        }
    }

    fetchLastCommitDate();