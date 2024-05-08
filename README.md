# Product Selector
React component for Product Selection based on user inputs.<br>
User is prompted with questions and predefined answers that are used in finding the most appropriate product for that user.<br>
Depending on specified paths the question cycle length may vary.<br>
This component is highly scalable and reusable as all the options/paths are inserted via JSON file.<br>
It supports multiple paths, selection history and updates all following answers upon changes made to previous answer. Meaning if user updates the first answer all the following answers will update to match that questions path.<br><br>

At the end of selection cycle, component displays to the user the overview of all the answers as last check before accessing the database to retrieve appropriate products.<br><br>

Built with React

[Live Demo](https://product-selector-smoky.vercel.app/) ✨

## Features
- Scalable react component
- Uses JSON data to display buttons and other data
- Progress tracker

**🧭 Possible Future Implementations**
- Implement database search and display of suggested products

## 💻 Built With
![javascript](https://skillicons.dev/icons?i=react,js,html,css&perline=10)
