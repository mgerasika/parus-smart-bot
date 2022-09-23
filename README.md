pkill -f node
heroku logs -t --app parus-smart-bot

chmod +x ./ngrok
./ngrok config add-authtoken 1t0wITgYEGzzbfm3HiqGtlXH3Zw_3X3aqQ2XrdGcsXausXSWR
./ngrok http 3005

sudo nano /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

https://developers.google.com/sheets/api/quickstart/js