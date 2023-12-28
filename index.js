// Import the 'inquirer' library for user prompts
import inquirer from "inquirer";
// Function to simulate the ATM machine conversation
async function startATMConversation() {
    console.log("Welcome to XYZ Bank!");
    // Prompt the user for details using inquirer
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "userId",
            message: "Please insert your card and enter your User ID:"
        },
        {
            type: "password",
            name: "userPin",
            message: "Enter your 4-digit PIN:"
        },
        {
            type: "list",
            name: "accountType",
            choices: ["Current Account", "Savings Account"],
            message: "Select your account type:"
        },
        {
            type: "list",
            name: "transactionType",
            choices: ["Fast Cash Withdrawal", "Normal Withdrawal", "Balance Inquiry", "Change PIN"],
            message: "Select your transaction type:"
        },
        {
            type: "list",
            name: "amount",
            choices: [1000, 2000, 5000, 10000],
            message: "Select your withdrawal amount (PKR):",
            when(answers) {
                return answers.transactionType === "Fast Cash Withdrawal";
            },
        },
        {
            type: "number",
            name: "amount",
            message: "Enter your withdrawal amount (PKR):",
            when(answers) {
                return answers.transactionType === "Normal Withdrawal";
            },
        },
        {
            type: "input",
            name: "otherTransaction",
            message: "Enter the type of transaction you want to perform:",
            when(answers) {
                return answers.transactionType === "Other Transaction";
            },
        },
    ]);
    // Displaying responses and simulating transactions
    if (answers.userId && answers.userPin) {
        console.log("Processing your request...");
        // Simulate generating a random balance (in a real system, this would be fetched from a database)
        const balance = Math.floor(Math.random() * 10000000);
        console.log("Your current balance is: PKR", balance.toLocaleString());
        const enteredAmount = answers.amount;
        // Check if the balance is sufficient for the entered amount
        if (balance >= enteredAmount) {
            const remainingBalance = balance - enteredAmount;
            console.log("Transaction successful. Your remaining balance is: PKR", remainingBalance.toLocaleString());
        }
        else {
            console.log("Insufficient balance. Please try again with a lower amount.");
        }
    }
}
// Start the ATM conversation
startATMConversation();
