// Common fields
let preset = "conventionalcommits";
let issuePrefixes = ["FIR-"];
let presetConfig = {
    issuePrefixes,
    issueUrlFormat: "https://packboard.atlassian.net/browse/FIR-{{id}}",
    types: [
        {"type": "feat", "section": "Features"},
        {"type": "fix", "section": "Bug fixes"},
        {"type": "chore", "section": "Maintenance"},
    ]
};
let parserOpts = {
    issuePrefixes,
    noteKeywords: ["BREAKING", "BREAKING CHANGE", "BREAKING CHANGES"]
};

// Build release rules object
let releaseRules = [
    {
        breaking: true,
        release: "major"
    },
    {
        revert: true,
        release: "patch"
    },
    {
        type: "feat",
        release: "minor"
    },
    {
        type: "fix",
        release: "minor"
    },
    {
        type: "chore",
        release: "minor"
    },
];

// Semantic release configuration
module.exports = {
    branches: [
        // Maintenance releases
        // See: https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow/maintenance-releases
        "+([0-9])?(.{+([0-9]),x}).x",
        // commits pushed to "main" or "master" branch should be released as "stable" versions
        "main", "master",
    ],
    plugins: [
        ["@semantic-release/commit-analyzer", {
            preset,
            parserOpts,
            presetConfig,
            releaseRules,
        }],
        ["@semantic-release/release-notes-generator", {
            preset,
            parserOpts,
            presetConfig,
        }],
    ]
};
