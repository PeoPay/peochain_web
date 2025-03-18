# Security Policy

## Supported Versions

Currently, these versions of PeoChain Platform are supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of PeoChain Platform seriously. If you believe you've found a security vulnerability, please follow these steps:

1. **Do not disclose the vulnerability publicly** until it has been addressed by our team.
2. Email your findings to security@peochain.com or contact the project maintainers directly.
3. Provide detailed information about the vulnerability, including:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fixes if available

## What to Expect

- We will acknowledge receipt of your vulnerability report within 48 hours.
- We will provide a more detailed response within 7 days, indicating the next steps in handling your report.
- We will keep you informed of our progress throughout the process.
- After the vulnerability has been addressed, we will publicly acknowledge your responsible disclosure, unless you prefer to remain anonymous.

## Security Best Practices for Deployment

If you're deploying this application, follow these security recommendations:

1. **Environment Variables**: Never commit real environment variables to the repository. Use `.env.example` as a template.
2. **API Keys**: Protect all API keys and secrets. Consider using a secrets management service.
3. **Database**: Limit database access, use appropriate user permissions, and regularly back up your data.
4. **Authentication**: Change the default admin credentials immediately after deployment.
5. **Updates**: Keep the application and all dependencies up to date with security patches.
6. **HTTPS**: Always serve the application over HTTPS in production.
7. **Session Management**: Use secure, HTTP-only cookies with appropriate expiration times.

## Security Features

This project implements several security features:

- CSRF protection
- Content Security Policy (CSP)
- XSS protection
- SQL injection prevention through parameterized queries
- Secure password hashing
- Rate limiting on sensitive endpoints

We appreciate your help in keeping PeoChain Platform secure!