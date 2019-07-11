workflow "Check" {
  on = "push"
  resolves = ["Coverage", "Build"]
}

workflow "Publish" {
  on = "create"
  resolves = "NPM Push"
}

workflow "Tag Latest" {
  on = "create"
  resolves = "NPM Latest"
}

action "Install" {
  uses = "docker://node:12"
  runs = "npm"
  args = "install"
}

action "Build" {
  uses = "docker://node:12"
  needs = "Install"
  runs = "npm"
  args = "run build"
}

action "Test" {
  uses = "docker://node:12"
  needs = "Install"
  runs = "npm"
  args = "test"
}

action "Coverage" {
  uses = "docker://node:12"
  needs = "Test"
  runs = "npx"
  args = "codecov"
  secrets = ["CODECOV_TOKEN"]
}

action "Tag Check: version" {
  uses = "actions/bin/filter@master"
  needs = ["Test", "Build"]
  args = "tag v/*"
}

action "NPM Push" {
  uses = "actions/npm@master"
  needs = "Tag Check: version"
  args = "publish --tag=next"
  secrets = ["NPM_AUTH_TOKEN"]
}

action "Tag Check: latest" {
  uses = "actions/bin/filter@master"
  args = "tag lv/*"
}

action "NPM Latest" {
  uses = "actions/npm@master"
  needs = "Tag Check: latest"
  args = "dist-tag add $(npm run -s ver) latest"
  secrets = ["NPM_AUTH_TOKEN"]
}
