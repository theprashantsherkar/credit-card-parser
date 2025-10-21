export function parseAmex(text) {
    const cardMatch = text.match(/Card ending (\d{4})/);
    const billingMatch = text.match(/Statement Period\s*:\s*(.*)/);
    const dueMatch = text.match(/Payment Due Date\s*:\s*(.*)/);
    const totalMatch = text.match(/Total Amount Due\s*:\s*(₹?\s*\d+[,.]?\d*)/);

    return {
        provider: "American Express",
        card_last4: cardMatch?.[1] || "N/A",
        billing_cycle: billingMatch?.[1] || "N/A",
        due_date: dueMatch?.[1] || "N/A",
        total_due: totalMatch?.[1] || "N/A"
    };
}
