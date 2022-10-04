pkill -f node
heroku logs -t --app parus-smart-bot

chmod +x ./ngrok
./ngrok config add-authtoken 1t0wITgYEGzzbfm3HiqGtlXH3Zw_3X3aqQ2XrdGcsXausXSWR
./ngrok http 3005

sudo nano /etc/nginx/sites-enabled/default
sudo systemctl restart nginx

https://developers.google.com/sheets/api/quickstart/js

//firebase
https://www.youtube.com/watch?v=LOeioOKUKI8
firebase serve --only functions,hosting

//ssl
https://www.youtube.com/watch?v=5wzs-pcDQ3k
https://www.digwebinterface.com/?hostnames=_acme-challenge.parus-smart.site.&type=TXT&ns=resolver&useresolver=8.8.4.4&nameservers=
sudo apt-get install certbot
sudo certbot certonly -d parus-smart.site -d \*.parus-smart.site --manual --preferred-challenges dns

https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/

sudo certbot --nginx -d parus-smart.site -d \*.parus-smart.site

https://www.digwebinterface.com/