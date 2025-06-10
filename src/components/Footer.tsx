import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Platform': [
      'How It Works',
      'Features',
      'Pricing',
      'Success Stories',
    ],
    'Services': [
      'University Search',
      'Application Support',
      'Scholarship Guidance',
      'Visa Assistance',
    ],
    'Company': [
      'About Us',
      'Our Team',
      'Careers',
      'Press',
    ],
    'Support': [
      'Help Center',
      'Contact Us',
      'FAQ',
      'Community',
    ],
  };

  const globalOffices = [
    'New York, USA',
    'London, UK',
    'Singapore',
    'Toronto, Canada',
    'Sydney, Australia',
  ];

  const socialLinks = [
    { icon: 'ph-twitter-logo', href: '#' },
    { icon: 'ph-linkedin-logo', href: '#' },
    { icon: 'ph-instagram-logo', href: '#' },
    { icon: 'ph-youtube-logo', href: '#' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <i className="ph-globe text-white text-2xl"></i>
                </div>
                <span className="text-2xl font-semibold text-glow">Knowlex</span>
              </div>
              
              <p className="text-muted-foreground font-light mb-6 leading-relaxed">
                Empowering students and professionals worldwide to achieve their educational and career dreams through AI-powered guidance and expert mentorship.
              </p>

              <div className="mb-6">
                <h4 className="text-lg font-medium mb-3">Global Offices</h4>
                <ul className="space-y-2">
                  {globalOffices.map((office) => (
                    <li key={office} className="text-muted-foreground font-light">
                      {office}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors duration-300"
                  >
                    <i className={`${social.icon} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-lg font-medium mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-muted-foreground font-light hover:text-foreground transition-colors duration-300"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-muted-foreground font-light">
              © {currentYear} KnowledgeExchange. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground font-light hover:text-foreground transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground font-light hover:text-foreground transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground font-light hover:text-foreground transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;