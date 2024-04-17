# Live link:
https://product-selector-smoky.vercel.app/

# Description:
React component for Product Selection based on user inputs.
User is prompted with questions and predefined answers that are used in finding the most appropriate product for that user.
Depending on specified paths the question cycle length may vary.
This component is highly scalable and reusable as all the options/paths are inserted via JSON file.
It supports multiple paths, selection history and updates all following answers upon changes made to previous answer. Meaning if user updates the first answer all the following answers will update to match that questions path.

At the end of selection cycle, component displays to the user the overview of all the answers as last check before accessing the database to retrieve appropriate products.

# Note:
Database querying as well as product display is not implemented.

This component is a demo limited to local code execution.