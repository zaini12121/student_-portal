/* Mock Database for students */
const mockStudents = {
    "10234": {
        username: "10234",
        password: "password123",
        name: "Jane Smith",
        rollNo: "10234",
        class: "10",
        feeStatus: "PAID",
        feeHistory: [
            { month: "March 2026", invoice: "#INV-10234-03", amount: "PKR 5,500", status: "Paid", date: "05 March 2026" },
            { month: "February 2026", invoice: "#INV-10234-02", amount: "PKR 5,500", status: "Paid", date: "02 February 2026" },
            { month: "January 2026", invoice: "#INV-10234-01", amount: "PKR 5,500", status: "Paid", date: "10 January 2026" }
        ],
        attendance: "94%"
    },
    "11456": {
        username: "11456",
        password: "password123",
        name: "John Doe",
        rollNo: "11456",
        class: "11",
        feeStatus: "UNPAID",
        feeHistory: [
            { month: "March 2026", invoice: "#INV-11456-03", amount: "PKR 7,000", status: "Unpaid", date: "-" },
            { month: "February 2026", invoice: "#INV-11456-02", amount: "PKR 7,000", status: "Paid", date: "01 February 2026" },
            { month: "January 2026", invoice: "#INV-11456-01", amount: "PKR 7,000", status: "Paid", date: "12 January 2026" }
        ],
        attendance: "88%"
    },
    "9001": { name: "Ali Ahmed", rollNo: "9001", password: "123", class: "9", feeStatus: "PAID", attendance: "90%", feeHistory: [] },
    "12001": { name: "Sara Khan", rollNo: "12001", password: "123", class: "12", feeStatus: "UNPAID", attendance: "85%", feeHistory: [] }
};

let leaveApplications = [
    { id: 1, name: "Zuhair Khan", rollNo: "11500", date: "2026-03-31", reason: "Suffering from high fever.", status: "Pending" }
];

let currentUser = null;
let selectedClass = null;
let isAdminMode = false;
let adminSelectedGrade = null;
let adminSearchQuery = "";
