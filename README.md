# Genshin Project

This application is a web-based Genshin Impact character encyclopedia. It allows users to filter and display information about various characters in the game, such as their names, rarities, visions, and weapons. It also displays information about the character's passive and skill talents, and allows users to view the character's portrait image. Additionally, it also allows users to view more details about different elements by clicking on the 'Vision' and fetching information from an external API. Overall, the goal of the application is to provide a comprehensive and convenient resource for users to learn more about the characters and elements in the Genshin Impact game.

![](https://i.ibb.co/wsj2ttX/Screenshot-2023-01-10-at-21-37-37.png)

You could start the App here: https://intruston.github.io/Genshin-Project/

To fetch the data about chatacters I used API from [genshin.dev](https://genshin.dev/) API. This API provide data about the Genshin Impact game.
However, API does not provide any images. All images are taken from  another [project](https://muakasan.github.io/genshin-portraits/index.html). I store images links inside **images.js** file as an array of objects.

**script.js** file is managing with buttons clicks and first interaction, before fetching the data from genshin.dev API.

**data.js** it retrieves all the information on characters and enables filtering through search by name and various attributes such as Rarity, Vision, and Weapon. The search feature prioritizes name and allows for multiple filter selections. You can reset your search by using the refresh button. Once you have selected your desired filter, click 'Find Character' and the table will display all of the characters that fit your criteria. Each name in the table is clickable and upon clicking you'll be able to see detailed information about the character, such as their passive and skill talents. Additionally, the Vision attribute in the character's information is also clickable, revealing more information about the Elemental reactions.
