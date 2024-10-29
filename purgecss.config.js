const PurgeCSS = require('purgecss').PurgeCSS;
const fs = require('fs');
const path = require('path');

async function runPurgeCSS() {
    const purgeCSSResults = await new PurgeCSS().purge({
        content: [
            path.join(__dirname, 'index.html'),
            path.join(__dirname, 'public', 'js', '*.js'),
        ],
        css: [
            path.join(__dirname, 'public', 'css', 'bootstrap.min.css'),
            path.join(__dirname, 'public', 'css', 'style.css'),
            path.join(__dirname, 'public', 'css', 'fonts.css'),
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    });

    const outputPath = path.join(__dirname, 'public', 'css', 'purged.css');
    fs.writeFileSync(outputPath, purgeCSSResults.map(result => result.css).join('\n'), 'utf-8');
    console.log(`Purged CSS written to ${outputPath}`);
}

runPurgeCSS().catch(err => {
    console.error('Error during PurgeCSS processing:', err);
});