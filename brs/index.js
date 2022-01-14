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
        release: "patch"
    },
    {
        type: "chore",
        release: "patch"
    },
];

// Semantic release configuration
module.exports = {
    branches: [
        // Maintenance releases
        // See: https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow/maintenance-releases
        "+([0-9])?(.{+([0-9]),x}).x",
        // commits pushed to "release" branch should be released as "stable" versions
        {name: "release", channel: "latest"},
        // commits pushed to "staging" branch should be released as "rc" versions
        {name: "staging", prerelease: "rc", channel: "rc"},
        // commits pushed to "main" or "master" branch should be released as "beta" versions
        {name: "main", prerelease: "beta", channel: "beta"},
        {name: "master", prerelease: "beta", channel: "beta"},
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
