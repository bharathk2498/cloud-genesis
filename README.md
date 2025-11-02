# Cloud Genesis 2.0

Cloud Genesis is a cloud‑agnostic migration and modernisation framework
designed for large enterprises. It provides a modular set of
configuration files, platform adapters, IaC modules, policy bundles and
orchestration workflows for migrating workloads between on‑premise
environments and public clouds, as well as between public clouds.  By
separating **configuration**, **execution** and **governance**
concerns, the framework scales to complex organisations and helps
teams adopt consistent guardrails across their entire estate.

## Enterprise‑grade features

- **Multi‑cloud support** – First‑class adapters and landing zone
  modules for AWS, Azure and Google Cloud with equivalent
  constructs.  Easily extendable to other providers via the
  `adapters/` directory.
- **Separation of concerns** – All environment definitions live in
  `configs/`, validated by JSON schemas under `schemas/`.  The
  migration engines themselves live in `orchestrator/`, while
  infrastructure code lives in `iac/`.
- **Policy as code** – Guardrails enforced via Open Policy Agent,
  Sentinel and native cloud policy frameworks under `policy-as-code/`.
- **FinOps built in** – Built‑in collectors, anomaly models and
  dashboards under `finops/` for proactive cost governance.
- **Validation pipeline** – Synthetic probes, performance tests and
  green‑light reports in `validation/` ensure cutovers meet service
  level objectives.
- **AI copilot integration** – The `copilot/` layer routes prompts
  through your preferred foundation models to generate migration
  plans, query runbooks or assist operators with tasks.
- **Enterprise hygiene** – This repository includes a code of
  conduct, contributing guidelines, security policy, editor config
  and CI workflows (in `ci/`) to enforce linting, schema validation
  and security scans.  Templates for pull request checks are
 provided out of the box.

- **Collaboration & lifecycle management** – The `.github/` folder
  contains code ownership declarations (`CODEOWNERS`), issue and pull
  request templates and a Dependabot configuration.  These help
  large teams manage contributions, triage issues and keep
  dependencies up to date in an automated fashion.

## Directory overview

| Path                         | Purpose |
|-----------------------------|---------|
| `.env.sample`               | Sample environment variables used by scripts and orchestrators |
| `.gitignore`                | Ignore patterns for local tooling, build artefacts and secrets |
| `.editorconfig`             | Editor configuration for consistent formatting |
| `LICENSE`                   | Project licence (MIT by default) |
| `SECURITY.md`               | Guidelines for reporting vulnerabilities |
| `CODE_OF_CONDUCT.md`        | Expected behaviour and community guidelines |
| `CONTRIBUTING.md`           | Contribution process and coding standards |
| `ROADMAP.md`                | Project roadmap and future work |
| `configs/`                  | YAML declarations describing your organisation, sources and targets |
| `schemas/`                  | JSON schemas used to validate the configuration files |
| `adapters/`                 | Scripts and translators for AWS, Azure and GCP |
| `onprem/`                   | Discovery connectors for VMware, Hyper‑V and database intake |
| `orchestrator/`             | No/low‑code workflows for discovery, planning, migration and validation |
| `iac/`                      | Terraform modules for landing zones, networks and guardrails |
| `policy-as-code/`           | Rego, Sentinel and cloud policy bundles enforcing compliance |
| `validation/`               | Synthetic tests, performance checks and report templates |
| `finops/`                   | Cost collectors, anomaly detection models and dashboard definitions |
| `copilot/`                  | AI route configuration and knowledge base integration |
| `dashboards/`               | Executive and operational dashboards definitions |
| `examples/`                 | Filled sample configurations for common migration scenarios |
| `ci/`                       | Continuous integration workflows (schema validation, dry‑runs, security scans) |

## Getting started

1. Copy the YAML files under `configs/` and customise them to reflect
   your organisation, current sources and target landing zones.
2. Validate your configuration using the provided schemas via the CI
   or by running the `validate-config.yml` GitHub Action locally.
3. Run the discovery workflows under `orchestrator/n8n/` to pull
   inventories from your sources and write them into the landing zone
   buckets or databases.
4. Use the planning workflow under `orchestrator/n8n/plan.json` to
   generate migration waves and right‑sizing recommendations based on
   your collected data.
5. Execute migrations with the `migrate.json` workflow (or the
   equivalent Airflow DAG under `orchestrator/airflow/dags/`) using
   cutover windows defined in your config.
6. Validate workloads post‑cutover using the synthetic and
   performance tests under `validation/` and produce a “green‑light”
   report before decommissioning the source.
7. Enforce guardrails via the Terraform modules in `iac/` and policy
   bundles in `policy-as-code/`, and monitor cost and usage via the
   FinOps dashboards.

Refer to the examples under `examples/` for pre‑filled scenarios and
to the individual README files within each folder for more details.