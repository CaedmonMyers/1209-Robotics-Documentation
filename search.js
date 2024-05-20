document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const query = document.getElementById('search-query').value.trim();
    const resultsContainer = document.getElementById('results');
    const loadingIndicator = document.getElementById('loading');
    const searchInput = document.getElementById('search-query');

    // Remove focus from the search input
    searchInput.blur();

    if (query === '') {
        resultsContainer.innerHTML = '<h2>Search all documentation pages</h2>';
        return;
    }

    // Show loading indicator and clear previous results
    loadingIndicator.style.display = 'block';
    resultsContainer.innerHTML = '';

    fetch(`/api/search?query=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';

            if (data.length === 0) {
                resultsContainer.innerHTML = '<h2>No results found</h2>';
            } else {
                data.forEach(result => {
                    const resultItem = document.createElement('div');
                    resultItem.classList.add('result-item');
                    resultItem.innerHTML = `<a href="${result.path}" target="_blank"><h3>${result.name.replace('/Overview.html', '').replace('.html', '')}</h3></a>`;
                    resultsContainer.appendChild(resultItem);
                });
            }
        })
        .catch(error => {
            // Hide loading indicator
            loadingIndicator.style.display = 'none';
            resultsContainer.innerHTML = '<p>Error fetching results. Please try again later.</p>';
            console.error('Error:', error);
        });
});
