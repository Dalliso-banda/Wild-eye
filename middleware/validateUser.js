const validate = (schema) => {
  
    return (req, res, next) => {
       
        const { error, value } = schema.validate(req.body, { 
            abortEarly: false, 
            stripUnknown: true 
        });

        if (error) {
          
            const errorMessage = error.details.map(detail => detail.message).join(', ');
            return res.status(400).json({ error: errorMessage });
        }

       
        req.body = value;
        next(); 
    };
};

export default validate