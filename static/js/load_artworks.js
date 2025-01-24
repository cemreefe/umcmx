    $(document).ready(function () {
        const jsonPath = "static/json/artworks.json";

        // Fetch the artworks JSON file
        $.getJSON(jsonPath, function (data) {
            const collections = data.collections;

            // Iterate through each collection
            for (const [collectionName, collectionData] of Object.entries(collections)) {
                if (!collectionData.metadata.display) continue;

                // Add collection description
                const descriptionHTML = `
                    <div class="collection-description ${collectionData.metadata.key}">
                        <h2>${collectionName} (${collectionData.metadata.year})</h2>
                        <p>${collectionData.metadata.description}</p>
                    </div>`;
                $("#artworks_display_container").append(descriptionHTML);

                // Create a grid for artworks
                const gridHTML = `<div class="artworks-grid ${collectionData.metadata.key}"></div>`;
                $("#artworks_display_container").append(gridHTML);

                // Add artworks to the grid
                collectionData.artworks.forEach((artwork) => {
                    const artworkHTML = `
                        <div class="artwork-card">
                            <a href="${artwork.href}" target="_blank">
                                <img src="${artwork.source}" alt="${artwork.name}" />
                                <p>${artwork.name}</p>
                            </a>
                        </div>`;
                    $(`.artworks-grid.${collectionData.metadata.key}`).append(artworkHTML);
                });
            }
        }).fail(function () {
            console.error("Failed to load artworks.json");
        });
    });
