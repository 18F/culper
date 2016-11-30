echo "Running before-deploy script"

# npm install
# npm run build

export PATH=$HOME:$PATH
curl -L -o $HOME/cf.tgz "https://cli.run.pivotal.io/stable?release=linux64-binary&version=6.15.0"
tar xzvf $HOME/cf.tgz -C $HOME
cf install-plugin autopilot -f -r CF-Community
