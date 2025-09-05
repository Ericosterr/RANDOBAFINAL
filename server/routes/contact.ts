import { RequestHandler } from "express";

interface ContactRequest {
  name: string;
  email?: string;
  phone?: string;
  serviceType?: string;
  message?: string;
  equipmentPackage?: string;
  selectedPackage?: string;
  formType: 'full' | 'popup' | 'rental';
}

interface ContactResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const handleContact: RequestHandler = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      serviceType,
      message,
      equipmentPackage,
      selectedPackage,
      formType
    }: ContactRequest = req.body;

    // Basic validation
    if (!name) {
      return res.status(400).json({
        success: false,
        error: "Name is required"
      });
    }

    // Validation based on form type
    if (formType === 'full') {
      if (!email || !serviceType || !message) {
        return res.status(400).json({
          success: false,
          error: "Email, service type, and message are required for full form"
        });
      }
    } else if (formType === 'popup') {
      if (!phone || !equipmentPackage) {
        return res.status(400).json({
          success: false,
          error: "Phone and equipment package are required for popup form"
        });
      }
    } else if (formType === 'rental') {
      if (!email || !phone || !selectedPackage) {
        return res.status(400).json({
          success: false,
          error: "Email, phone, and selected package are required for rental form"
        });
      }
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Integrate with CRM
    // 4. Send confirmation email to user
    
    // For now, we'll just log the submission and return success
    console.log('Contact form submission:', {
      formType,
      name,
      email,
      phone,
      serviceType,
      message,
      equipmentPackage,
      selectedPackage,
      timestamp: new Date().toISOString()
    });

    const response: ContactResponse = {
      success: true,
      message: `Contact form submitted successfully (${formType})`
    };

    res.status(200).json(response);

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    const response: ContactResponse = {
      success: false,
      error: "Internal server error"
    };

    res.status(500).json(response);
  }
};
