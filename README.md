
Built by https://www.blackbox.ai

---

```markdown
# Election Seat Calculator

## Project Overview
The Election Seat Calculator is a web application that helps users allocate seats to various political parties using two different electoral systems: the D'Hondt method and the Hare-Niemeyer method. This tool provides a straightforward interface to enter party names and their votes, calculate seat distribution, and view the results in a structured format.

## Installation
To run the Election Seat Calculator locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/election-seat-calculator.git
   cd election-seat-calculator
   ```

2. **Open `index.html` in your browser.**  
   You can simply double-click the file or open it through your browser's "Open File" option.

## Usage
1. Enter the total number of seats available for allocation.
2. Add the political parties along with their respective vote counts.
3. Click on either the "Calculate D'Hondt" or "Calculate Hare-Niemeyer" button to perform the calculation.
4. View the results on the results page, where you can see how many seats each party has been allocated.

## Features
- Calculate seat allocations using the **D'Hondt method**.
- Calculate seat allocations using the **Hare-Niemeyer method**.
- User-friendly interface with dynamic addition and removal of party input rows.
- Error handling to ensure valid inputs for total seats and party votes.
- Summary of results displayed after calculations, including total votes and seats allocated.

## Dependencies
The application uses the following dependencies:

- [Tailwind CSS](https://tailwindcss.com/) for styling.
- Font Awesome for icons.

These are included via CDN in the HTML files, so no additional installation is required.

## Project Structure
The project consists of the following files:

```
/election-seat-calculator
│
├── index.html       # Main user interface for seat calculation
├── results.html     # Page to display the results of the allocation
├── script.js        # JavaScript logic for handling calculations and dynamic UI updates
```

### index.html
Contains the main structure and layout of the application, including inputs for total seats and party votes, as well as buttons to calculate results.

### results.html
Displays the calculated results, including the number of seats allocated to each party and summaries of votes and seats.

### script.js
Contains all the necessary JavaScript functions to manage user input, validate data, calculate seat allocations using both methods, and handle the display of results.

## Contributing
Contributions are welcome! If you'd like to improve the project, feel free to submit a pull request.

## License
This project is open source and available under the [MIT License](LICENSE).
```
This README provides all the essential information for users and developers to understand, install, use, and contribute to the Election Seat Calculator project.