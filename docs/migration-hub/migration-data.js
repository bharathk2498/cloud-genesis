const phases = [
    {
        id: 'preflight',
        name: 'Pre-Flight Check',
        description: 'Establish AWS foundation and security baseline before migration',
        steps: [
            {
                title: 'Set Up AWS Organization Structure',
                why: 'AWS Organizations provides centralized billing, consolidated security controls, and policy-based management across multiple AWS accounts. This prevents the "account sprawl" problem and ensures consistent governance from day one.',
                what: 'Create a multi-account structure using AWS Organizations with separate accounts for production, development, staging, and shared services (logging, security tools). This follows AWS Well-Architected best practices.',
                how: `<p><strong>Console Steps:</strong></p>
                <ol style="margin-left: 1.5rem; color: #cbd5e1;">
                    <li>Sign in to AWS Management Console → Navigate to AWS Organizations</li>
                    <li>Click "Create Organization" → Choose "All features"</li>
                    <li>Create Organizational Units (OUs): Production, Development, Security</li>
                    <li>Create member accounts: Click "Add account" → "Create account"</li>
                </ol>
                <div class="code-block">
                    <div class="code-label">CLI Command:</div>
                    <code># Create the organization<br>
aws organizations create-organization --feature-set ALL<br><br>
# Create OUs<br>
aws organizations create-organizational-unit \\<br>
  --parent-id r-xxxx --name Production<br><br>
# Create member account<br>
aws organizations create-account \\<br>
  --email prod-aws@yourcompany.com \\<br>
  --account-name "Production Account"</code>
                </div>`,
                verify: `<ul class="checklist">
                    <li>All accounts appear in AWS Organizations console</li>
                    <li>Consolidated billing is active (check Billing dashboard)</li>
                    <li>Service Control Policies (SCPs) are applied to OUs</li>
                    <li>CloudTrail is enabled across all accounts</li>
                </ul>`
            },
            {
                title: 'Design VPC Network Architecture',
                why: 'A well-planned VPC architecture prevents IP conflicts, ensures proper network segmentation, and allows for future scaling. Poor network design is extremely difficult to fix post-migration.',
                what: 'Design a VPC with public and private subnets across multiple Availability Zones. Calculate CIDR blocks that accommodate growth without overlapping with on-premises networks.',
                how: `<p><strong>VPC Design Best Practices:</strong></p>
                <div class="tip-box">
                    <div class="tip-title">💡 CIDR Block Sizing</div>
                    <p>For production: Use /16 (65,536 IPs)<br>
                    For staging/dev: Use /20 (4,096 IPs)<br>
                    Avoid 10.0.0.0/8 if used on-premises</p>
                </div>
                <div class="code-block">
                    <div class="code-label">Create VPC with AWS CLI:</div>
                    <code># Create VPC<br>
aws ec2 create-vpc \\<br>
  --cidr-block 10.100.0.0/16 \\<br>
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=Production-VPC}]'<br><br>
# Create public subnet in AZ-1<br>
aws ec2 create-subnet \\<br>
  --vpc-id vpc-xxxxx \\<br>
  --cidr-block 10.100.1.0/24 \\<br>
  --availability-zone us-east-1a \\<br>
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Public-Subnet-1a}]'<br><br>
# Create private subnet in AZ-1<br>
aws ec2 create-subnet \\<br>
  --vpc-id vpc-xxxxx \\<br>
  --cidr-block 10.100.10.0/24 \\<br>
  --availability-zone us-east-1a \\<br>
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Private-Subnet-1a}]'</code>
                </div>
                <div class="warning-box">
                    <div class="warning-title">⚠️ Common Mistake</div>
                    <p>Don't create overlapping CIDR blocks between VPCs if you plan to use VPC peering or Transit Gateway later.</p>
                </div>`,
                verify: `<ul class="checklist">
                    <li>VPC has at least 2 AZs for high availability</li>
                    <li>Public subnets have route to Internet Gateway</li>
                    <li>Private subnets have route to NAT Gateway</li>
                    <li>No CIDR conflicts with on-premises or other VPCs</li>
                    <li>Subnet calculator confirms proper IP allocation</li>
                </ul>`
            }
        ]
    },
    {
        id: 'discovery',
        name: 'Discovery & Assessment',
        description: 'Inventory existing infrastructure and map dependencies',
        steps: [
            {
                title: 'Install AWS Application Discovery Service Agents',
                why: 'Accurate migration planning requires deep visibility into your current environment. Discovery agents provide the data needed for right-sizing and cost estimates.',
                what: 'Deploy AWS Application Discovery Service agents to collect system configuration, performance, and network dependency data.',
                how: `<p><strong>Agent Installation:</strong></p>
                <div class="code-block">
                    <div class="code-label">Linux Installation:</div>
                    <code>wget https://s3-us-west-2.amazonaws.com/aws-discovery-agent.us-west-2/linux/latest/aws-discovery-agent.tar.gz<br>
tar -xzf aws-discovery-agent.tar.gz<br>
sudo bash install -r us-west-2 -k YOUR_ACCESS_KEY -s YOUR_SECRET_KEY</code>
                </div>`,
                verify: `<ul class="checklist">
                    <li>Agents appear healthy in Migration Hub console</li>
                    <li>Data collection is active</li>
                    <li>Network connections are being mapped</li>
                </ul>`
            }
        ]
    },
    {
        id: 'strategy',
        name: 'Migration Strategy (6 Rs)',
        description: 'Choose the right migration approach',
        steps: [
            {
                title: 'Understand the 6 R\'s Framework',
                why: 'Different applications require different migration strategies. The 6 R\'s provide a decision framework.',
                what: 'Evaluate each application: Rehost, Replatform, Repurchase, Refactor, Retire, or Retain.',
                how: `<p><strong>Decision Guide:</strong></p>
                <div class="tip-box">
                    <div class="tip-title">💡 Rehost (Lift & Shift)</div>
                    <p>Move as-is to AWS. Fast but minimal optimization.</p>
                </div>
                <div class="tip-box">
                    <div class="tip-title">💡 Replatform</div>
                    <p>Minor optimizations like moving DB to RDS.</p>
                </div>`,
                verify: `<ul class="checklist">
                    <li>Every application has assigned strategy</li>
                    <li>Stakeholders approve decisions</li>
                </ul>`
            }
        ]
    },
    {
        id: 'execution',
        name: 'Execution',
        description: 'Execute migration with AWS MGN',
        steps: [
            {
                title: 'Set Up AWS Application Migration Service',
                why: 'AWS MGN provides automated, block-level replication with minimal downtime.',
                what: 'Configure MGN and install agents on source servers.',
                how: `<p><strong>MGN Setup:</strong></p>
                <ol style="margin-left: 1.5rem; color: #cbd5e1;">
                    <li>Navigate to AWS MGN console</li>
                    <li>Click "Set up service"</li>
                    <li>Configure replication settings</li>
                </ol>`,
                verify: `<ul class="checklist">
                    <li>MGN service initialized</li>
                    <li>Replication settings configured</li>
                </ul>`
            }
        ]
    },
    {
        id: 'validation',
        name: 'Validation & Testing',
        description: 'Post-migration validation',
        steps: [
            {
                title: 'Run Functional Testing',
                why: 'Ensure migrated applications work correctly in AWS.',
                what: 'Execute UAT, API tests, and database integrity checks.',
                how: `<div class="code-block">
                    <div class="code-label">API Testing:</div>
                    <code>curl -X GET https://api.example.com/health</code>
                </div>`,
                verify: `<ul class="checklist">
                    <li>All UAT test cases pass</li>
                    <li>No data loss detected</li>
                </ul>`
            }
        ]
    },
    {
        id: 'optimization',
        name: 'Post-Migration Optimization',
        description: 'Optimize for cost and performance',
        steps: [
            {
                title: 'Implement Cost Optimization',
                why: 'Initial migrations typically overprovision. Optimization reduces costs by 30-50%.',
                what: 'Right-size instances, purchase Reserved Instances, and clean up unused resources.',
                how: `<div class="code-block">
                    <div class="code-label">Find underutilized instances:</div>
                    <code>aws cloudwatch get-metric-statistics \\<br>
  --namespace AWS/EC2 \\<br>
  --metric-name CPUUtilization \\<br>
  --dimensions Name=InstanceId,Value=i-xxxxx</code>
                </div>`,
                verify: `<ul class="checklist">
                    <li>Average CPU utilization is 40-70%</li>
                    <li>No unattached EBS volumes</li>
                    <li>Reserved Instance coverage > 50%</li>
                </ul>`
            }
        ]
    }
];