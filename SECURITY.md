# Security Policy

Security is paramount in any migration framework.  We take
vulnerabilities seriously and will address them as quickly as
possible.  Please follow the guidelines below for reporting security
issues.

## Supported versions

The main branch of this repository is maintained.  You should always
deploy from a tagged release.  We do not provide back‑port support for
older tags; instead, upgrade to the latest release to receive
security fixes.

## Reporting a vulnerability

If you believe you have found a security vulnerability, **do not file
an issue in the GitHub issue tracker**.  Instead, please email
`security@yourcompany.example` with the following information:

1. A description of the vulnerability and where it was found.
2. Steps to reproduce or a proof of concept (if available).
3. Any potential impact you believe the vulnerability could have.

We will acknowledge receipt of your report within 48 hours.  After
investigation, we will work with you to reproduce and understand the
issue and will release a patch as soon as possible.  Please respect
our responsible disclosure policy and do not disclose the issue
publicly until a fix has been released.

## General security guidance

- Do not commit secrets or credentials to the repository.  Use
  environment variables or secret management services (e.g. AWS
  Secrets Manager, Azure Key Vault, GCP Secret Manager).
- Review and follow the principle of least privilege when defining
  IAM roles in `configs/targets.yaml` and associated policies.
- Regularly run static analysis (e.g. [tfsec](https://tfsec.dev),
  [shellcheck](https://www.shellcheck.net)) and dependency scans (e.g.
  GitHub Dependabot) to identify potential risks.
- Keep your dependencies up to date.  The CI pipelines in `ci/`
  include security scanning steps.