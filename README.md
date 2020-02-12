# rguthrieUserDirectory
rguthrie's User Directory -- React app to fetch, sort and filter user records.

Uses React without hooks (opportunity for re-factoring!).

User Directory presents a list of users as rows in a table,
with columns for various personal information. The table rows
can be sorted based on any column, either ascending or descending.
The rows can also be filtered based on any column, with numeric
columns filtered on numeric range, and text columns filtered based
on match to a partial string. Results of filtering re-define the
list, with a history of the filters displayed.  A Reset button
is supplied to restore the original list.

This React app was created using the react package's create-react-app
script for the npm CLI.  'npx create-react-app rguthrieuserdirectory'

The app is deployed on GitHub pages at:

https://rguthrie000.github.io/rguthrieUserDirectory/

The repository on GitHub is:  rguthrie000/rguthrieUserDirectory

# Requirements

Given a table of random users, when the user loads the page, the table of random users should render. 

The user should be able to:

  * Sort the table by rows using at least one category

  * Filter the table by rows using at least one property.    

# Design Notes

User Directory uses pre-v16.8 React, which means no hooks were used. The create-react-app
script supplied with the react package was used to create the startup and initial HTML file.
A bootstrap.com link was added to the index.HTML file, and the utils/API file was created,
but otherwise only the files in /src are application-specific.

## This application was developed with:
VS Code - Smart Editor for HTML/CSS/JS
node.js - JavaScript command-line interpreter
Google Chrome Inspector - inspection/analysis tools integrated in Chrome Browser.
react - middleware for optimized DOM manipulation and integrated JSX coding.
github - version control, content repository.
heroku - web deployment, including database hosting.

## Versioning

GitHub is used for version control; the github repository is 
rguthrie000/rguthrieUserDirectory.

## Author
rguthrie000 (Richard Guthrie)

## Acknowledgments
rguthrie000 is grateful to the UCF Coding Bootcamp - we rock!


