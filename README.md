# Spotify-Data-Collection-APP

Para coletar as Top 20 Músicas de usuários de nossa faculdade, foi criado uma aplicação Web em ReactJS que utiliza a API do Spotify para realizar a autenticação OAuth2, e assim, buscar as top 20 músicas com o endpoint https://api.spotify.com/v1/me/top/tracks Após o usuário logar e clicar no botão de gerar os dados era baixado um arquivo JSON com as informações, que então pedimos para o usuário nos enviar o arquivo por email. Após receber o JSON, utilizamos Python e pandas novamente para gerar os csv de dados dos usuários. Link do website: https://spotify-data-collection-app.vercel.app/

Observação: Por ser uma aplicação de desenvolvimento, apenas usuários cadastrados no aplicativo Spotify são capazes de logar no nosso site, portanto foi requisitado previamente aos participantes seus emails para que sejam adicionados como beta testers.
