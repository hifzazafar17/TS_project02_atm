// import inquirer from "inquirer";

// interface ansType{
//     userId:string,
//     userPin: number,
// }
// const answers: ansType = await inquirer.prompt([
//     {
//         type: "input",
//         name: "userId",
//         message: "kindly enter your Id:"
//     },
//     {
//         type: "number",
//         name: "userPin",
//         message: "kindly enter your Pin:"
//     },
//     {
//         type: "input",
//         name: "userPin",
//         message: "kindly enter your Pin:"
//     },
//     {
//         type: "list",
//         name: "Account Type",
//         choices: ["Current", "Saving"],
//         message: "Please select your Account Type:"
//     },
//     {
//         type: "list",
//         name: "TransactionType",
//         choices: ["Cash withdrawals", "Balance inquiries", "Account deposits", "Fast Cash"],
//         message: "kindly select your Transaction:",
//         when(answers) {
//             answers.AccountType
//         },
//     },
//     {
//         type: "list",
//         name: "amount",
//         choices: ["1000", "5000", "10000", "20000"],
//         message: "kindly select your amount:",
//         when(answers) {
//             answers.TransactionType == "Fast Cash"
//         },
//     },
//     {
//         type: "number",
//         name: "amount",
//         choices: ["1000", "5000", "10000", "20000"],
//         message: "kindly enter your amount:",
//         when(answers) {
//             answers.TransactionType == "Cash withdrawals"
//         },
//     },
// ])

// console.log(answers)





// this in  my code 





// Import the 'inquirer' library for user prompts
import inquirer from "inquirer";

// Define the expected structure of user answers
interface UserAnswers {
    userId: string;
    userPin: number;
    accountType: string;
    transactionType: string;
    amount: number;
}

// Prompt the user for details using inquirer
const answers: UserAnswers = await inquirer.prompt([
    {
        type: "input",
        name: "userId",
        message: "Kindly Enter your User ID:"
    },
    {
        type: "number",
        name: "userPin",
        message: "Kindly Enter your PIN:"
    },
    {
        type: "list",
        name: "accountType",
        choices: ["Current", "Saving"],
        message: "Select your account type:"
    },
    {
        // Prompt for transaction type only if the account type is selected
        type: "list",
        name: "transactionType",
        choices: ["Fast Cash", "Withdraw"],
        message: "Select your transaction type:",
        when(answers) {
            return answers.accountType;
        },
    },
    {
        // Prompt for amount only if the transaction type is "Fast Cash"
        type: "list",
        name: "amount",
        choices: [1000, 2000, 10000, 20000],
        message: "Select your amount:",
        when(answers) {
            return answers.transactionType === "Fast Cash";
        },
    },
    {
        // Prompt for amount only if the transaction type is "Withdraw"
        type: "number",
        name: "amount",
        message: "Enter your amount:",
        when(answers) {
            return answers.transactionType === "Withdraw";
        },
    }
]);

// Check if userId and userPin are provided
if (answers.userId && answers.userPin) {

    // Simulate generating a random balance (in a real system, this would be fetched from a database)
    const balance = Math.floor(Math.random() * 10000000);
    console.log("Your current balance is: PKR", balance);

    const enteredAmount = answers.amount;

    // Check if the balance is sufficient for the entered amount
    if (balance >= enteredAmount) {
        const remainingBalance = balance - enteredAmount;
        console.log("Transaction successful. Your remaining balance is: PKR", remainingBalance);
    } else {
        console.log("Insufficient balance. Please try again with a lower amount.");
    }
}
