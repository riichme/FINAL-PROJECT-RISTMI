// Import user authorization middleware and invoice model
const { subject } = require('@casl/ability');
const { policyFor } = require('../../utils');
const Invoice = require('./model');

// handle showing invoice by order id
const show = async(req, res, next) => {
    try {
        // order id as parameter
        let {order_id} = req.params;

        // Find invoice by order id include order data and user data
        let invoice = await Invoice.findOne({order: order_id}).populate('order').populate('user');

        // Handle policy or authorization
        // Only logged user can see the invoice
        let policy = policyFor(req.user);

        // Logged user will be checked by user id
        let subjectInvoice = subject('Invoice', {...invoice, user_id: invoice.user._id});

        // if there's unauthorized user
        if(!policy.can('read', subjectInvoice)){
            return res.json({
                error: 1,
                message: `Anda tidak memiliki akses untuk melihat invoice ini.`
            });
        }

        // Return response of invoice as JSON
        return res.json(invoice);
    } catch (err) { // If error exists
        return res.json({  // return error as JSON
            error: 1,
            message: err.message,
        });
        
    }
    
}

// Export to router invoice
module.exports = {
    show
}