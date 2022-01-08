# Petsitter

Automatic and frenly Petsitter script to make your Aavegotchis happy.

# Install guide

you need Node + web3 to run this script, i'll consider you have nothing

```
sudo apt-get update
sudo apt-get upgrade
sudo apt install npm
sudo npm install web3
git clone https://github.com/marczeller/Petsitter.git
cd Petsitter/
nano config.js
```
fill config with your information

```
tmux
```
```
watch -n 300 node petsitter.js
```
will launch the script every 5min, change the 300 number for the amount of seconds interval you want your script to be relaunched

to exit just `cmd b + d`

you can close your terminal

# reco

- consider using an Alchemy RPC, it's cool to monitor and is more reliable than public RPC
- consider adding the pet address to a watch-only wallet you have notification on to get updated as script works I use trust wallet on mobile to do this.
