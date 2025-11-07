// ============================================================================
// ENTERPRISE-GRADE AWS ON-PREMISE MIGRATION GUIDE
// 200+ Production-Ready Steps for Fortune 500 Migrations
// ============================================================================

const phases = [
    {
        id: 'preflight',
        name: '🚀 Phase 1: Pre-Flight Check',
        description: 'Establish enterprise-grade AWS foundation with multi-account architecture, network design, and comprehensive security baseline',
        steps: [
            {
                title: '1.1 Design Multi-Account Strategy (AWS Organizations)',
                why: 'AWS Organizations with a well-architected multi-account strategy is non-negotiable for enterprises. Single account = security nightmare, cost chaos, compliance failure. Organizations provide: centralized billing (single invoice for 100+ accounts), consolidated CloudTrail (unified audit), Service Control Policies (preventive guardrails), resource sharing via RAM, and account isolation for blast radius containment. Without this, you\'ll face account sprawl, shadow IT, security drift, and audit failures.',
                what: 'Implement AWS Landing Zone (Control Tower) with hub-and-spoke architecture: Management account (billing/org management only, NO workloads), Security account (GuardDuty master, Security Hub aggregator, CloudTrail logs), Log Archive account (S3 log centralization), Shared Services account (AD, DNS, monitoring), and separate OUs for Production, Non-Production, Sandbox, and Suspended accounts. This follows AWS Well-Architected best practices and scales to thousands of accounts.',
                how: `<p><strong>📋 Architecture Decision:</strong></p>
                <div class="tip-box">
                    <div class="tip-title">🏗️ Account Structure for Enterprises</div>
                    <p><strong>Management OU:</strong><br>
                    └── Management Account (billing, Organizations, Control Tower)<br><br>
                    <strong>Security OU:</strong><br>
                    ├── Security Tooling (GuardDuty, Security Hub, Macie master)<br>
                    └── Log Archive (S3 buckets for CloudTrail, VPC Flow Logs, Config)<br><br>
                    <strong>Infrastructure OU:</strong><br>
                    ├── Shared Services (Transit Gateway, Route53, AD Connector)<br>
                    └── Network (VPC templates, Direct Connect, VPN)<br><br>
                    <strong>Workloads OUs:</strong><br>
                    ├── Production (PROD workloads, strict SCPs, max security)<br>
                    ├── Staging (UAT, performance testing, prod-like)<br>
                    ├── Development (dev/test, relaxed SCPs)<br>
                    └── Sandbox (experimentation, auto-terminated after 7 days)</p>
                </div>
                
                <p><strong>Step 1: Enable AWS Control Tower (Recommended)</strong></p>
                <div class="code-block">
                    <div class="code-label">Management Account Console:</div>
                    <code>1. Navigate to AWS Control Tower console<br>
2. Click "Set up landing zone"<br>
3. Configure:<br>
   - Region: us-east-1 (or home region)<br>
   - Log Archive email: logs@company.com<br>
   - Audit (Security) email: security@company.com<br>
4. Takes ~60 minutes to provision</code>
                </div>
                
                <p><strong>Step 2: Create Organizational Units</strong></p>
                <div class="code-block">
                    <div class="code-label">AWS CLI - Create OUs:</div>
                    <code># Get root OU ID<br>
ROOT_ID=$(aws organizations list-roots --query 'Roots[0].Id' --output text)<br><br>
# Create Security OU<br>
aws organizations create-organizational-unit \\<br>
  --parent-id $ROOT_ID \\<br>
  --name "Security"<br><br>
# Create Infrastructure OU<br>
aws organizations create-organizational-unit \\<br>
  --parent-id $ROOT_ID \\<br>
  --name "Infrastructure"<br><br>
# Create Workloads OU<br>
WORKLOADS_OU=$(aws organizations create-organizational-unit \\<br>
  --parent-id $ROOT_ID \\<br>
  --name "Workloads" \\<br>
  --query 'OrganizationalUnit.Id' --output text)<br><br>
# Create child OUs under Workloads<br>
aws organizations create-organizational-unit \\<br>
  --parent-id $WORKLOADS_OU \\<br>
  --name "Production"<br><br>
aws organizations create-organizational-unit \\<br>
  --parent-id $WORKLOADS_OU \\<br>
  --name "Staging"<br><br>
aws organizations create-organizational-unit \\<br>
  --parent-id $WORKLOADS_OU \\<br>
  --name "Development"</code>
                </div>
                
                <p><strong>Step 3: Create Workload Accounts</strong></p>
                <div class="code-block">
                    <div class="code-label">Create accounts programmatically:</div>
                    <code># Production account<br>
aws organizations create-account \\<br>
  --email prod-aws@company.com \\<br>
  --account-name "Production" \\<br>
  --iam-user-access-to-billing ALLOW<br><br>
# Wait for account creation (async operation)<br>
ACCOUNT_ID=$(aws organizations list-accounts \\<br>
  --query 'Accounts[?Name==\`Production\`].Id' --output text)<br><br>
# Move to Production OU<br>
aws organizations move-account \\<br>
  --account-id $ACCOUNT_ID \\<br>
  --source-parent-id $ROOT_ID \\<br>
  --destination-parent-id ou-xxxx-production</code>
                </div>
                
                <p><strong>Step 4: Apply Service Control Policies (SCPs)</strong></p>
                <div class="tip-box">
                    <div class="tip-title">🔒 Production SCP Example</div>
                    <p>Deny all regions except home regions, deny root user actions, require MFA, prevent GuardDuty/CloudTrail disabling</p>
                </div>
                <div class="code-block">
                    <div class="code-label">Create production-scp.json:</div>
                    <code>{<br>
  "Version": "2012-10-17",<br>
  "Statement": [<br>
    {<br>
      "Effect": "Deny",<br>
      "Action": "*",<br>
      "Resource": "*",<br>
      "Condition": {<br>
        "StringNotEquals": {<br>
          "aws:RequestedRegion": ["us-east-1", "us-west-2", "eu-west-1"]<br>
        },<br>
        "ArnNotLike": {<br>
          "aws:PrincipalArn": "arn:aws:iam::*:role/OrganizationAccountAccessRole"<br>
        }<br>
      }<br>
    },<br>
    {<br>
      "Effect": "Deny",<br>
      "Action": [<br>
        "guardduty:DeleteDetector",<br>
        "guardduty:DisassociateFromMasterAccount",<br>
        "guardduty:StopMonitoringMembers",<br>
        "securityhub:DisableSecurityHub",<br>
        "config:DeleteConfigurationRecorder",<br>
        "config:DeleteDeliveryChannel",<br>
        "config:StopConfigurationRecorder"<br>
      ],<br>
      "Resource": "*"<br>
    }<br>
  ]<br>
}</code>
                </div>
                <div class="code-block">
                    <div class="code-label">Apply SCP to Production OU:</div>
                    <code>aws organizations create-policy \\<br>
  --content file://production-scp.json \\<br>
  --name "ProductionGuardrails" \\<br>
  --type SERVICE_CONTROL_POLICY \\<br>
  --description "Preventive controls for production"<br><br>
POLICY_ID=$(aws organizations list-policies \\<br>
  --filter SERVICE_CONTROL_POLICY \\<br>
  --query 'Policies[?Name==\`ProductionGuardrails\`].Id' --output text)<br><br>
aws organizations attach-policy \\<br>
  --policy-id $POLICY_ID \\<br>
  --target-id ou-xxxx-production</code>
                </div>
                
                <div class="warning-box">
                    <div class="warning-title">⚠️ Critical: Test SCPs in Sandbox First</div>
                    <p>SCPs are preventive controls that override IAM permissions. Even account administrators cannot bypass SCPs. ALWAYS test in sandbox/dev before applying to production. A misconfigured SCP can lock out all users, including admins. Keep an emergency break-glass role in the management account.</p>
                </div>`,
                
                verify: `<ul class="checklist">
                    <li>AWS Control Tower landing zone status = "Available"</li>
                    <li>All OUs created (Security, Infrastructure, Workloads with sub-OUs)</li>
                    <li>Minimum 5 accounts created (Management, Security, Log Archive, Shared Services, 1 workload)</li>
                    <li>Accounts moved to appropriate OUs (check Organizations console)</li>
                    <li>SCPs attached to Production OU (verify with aws organizations list-policies-for-target)</li>
                    <li>Consolidated billing active - single invoice visible in Management account</li>
                    <li>AWS SSO (IAM Identity Center) configured for centralized access</li>
                    <li>Email addresses for all accounts are monitored (AWS sends critical notifications)</li>
                    <li>MFA enabled on root user for ALL accounts (use virtual MFA or hardware token)</li>
                    <li>Root user credentials stored in corporate password vault (HashiCorp Vault, 1Password)</li>
                    <li>Organizations CloudTrail enabled (management events for all accounts)</li>
                </ul>
                
                <div class="tip-box">
                    <div class="tip-title">💡 Best Practice: Account Vending Machine</div>
                    <p>For enterprises managing 50+ accounts, automate account creation:<br>
                    • AWS Control Tower Account Factory (integrated with Service Catalog)<br>
                    • Terraform aws_organizations_account resource<br>
                    • Custom Lambda + Step Functions for account provisioning pipeline<br>
                    • Auto-apply baseline: CloudTrail, Config, GuardDuty, Security Hub, Systems Manager, Backup<br>
                    • Typical provision time: 15 minutes from request to ready</p>
                </div>`
            },
            {
                title: '1.2 Design Enterprise VPC Architecture (Multi-AZ, Multi-Tier)',
                why: 'VPC network design is PERMANENT - fixing a bad network topology post-migration requires re-migrating everything. Poor design causes: IP exhaustion (ran out of IPs after 6 months), inability to peer VPCs (overlapping CIDRs), security issues (no segmentation), compliance failures (flat networks), high NAT costs, and complex routing. Enterprise networks need: proper CIDR planning, multi-AZ redundancy, tiered subnets (public/private/data), VPC peering/Transit Gateway for connectivity, centralized egress, and room for growth.',
                what: 'Design production-grade VPC with: /16 CIDR (65K IPs for growth), minimum 3 AZs for HA, 3 subnet tiers per AZ (public for LBs, private for apps, isolated for databases), NAT Gateways in each AZ, VPC Flow Logs to S3, DHCP options for DNS, and VPC endpoints for AWS services (S3, DynamoDB, etc). Use non-overlapping RFC1918 space, avoid 10.0.0.0/8 and 172.16.0.0/12 if used on-premises. Document everything in IP Address Management (IPAM) tool.',
                how: `<p><strong>📋 CIDR Planning Calculator</strong></p>
                <div class="tip-box">
                    <div class="tip-title">🧮 Production VPC CIDR Allocation (Example)</div>
                    <p><strong>VPC CIDR: 10.100.0.0/16 (65,536 IPs)</strong><br><br>
                    <strong>Per-AZ Allocation (3 AZs = us-east-1a, 1b, 1c):</strong><br>
                    <strong>AZ-1a (10.100.0.0/18 - 16,384 IPs):</strong><br>
                    ├── Public-1a: 10.100.0.0/24 (256 IPs) - Load Balancers, NAT GW<br>
                    ├── Private-1a: 10.100.1.0/23 (512 IPs) - Application tier<br>
                    ├── Data-1a: 10.100.3.0/24 (256 IPs) - Databases, ElastiCache<br>
                    └── Reserved: 10.100.4.0/22 (1,024 IPs) - Future expansion<br><br>
                    
                    <strong>AZ-1b (10.100.64.0/18):</strong><br>
                    ├── Public-1b: 10.100.64.0/24<br>
                    ├── Private-1b: 10.100.65.0/23<br>
                    ├── Data-1b: 10.100.67.0/24<br>
                    └── Reserved: 10.100.68.0/22<br><br>
                    
                    <strong>AZ-1c (10.100.128.0/18):</strong><br>
                    ├── Public-1c: 10.100.128.0/24<br>
                    ├── Private-1c: 10.100.129.0/23<br>
                    ├── Data-1c: 10.100.131.0/24<br>
                    └── Reserved: 10.100.132.0/22<br><br>
                    
                    <strong>Global Reserved (10.100.192.0/18):</strong><br>
                    └── Future VPCs, VPC peering, Transit Gateway attachments</p>
                </div>
                
                <p><strong>Step 1: Create VPC with IPAM (Recommended for Enterprises)</strong></p>
                <div class="code-block">
                    <div class="code-label">Enable AWS IPAM first (centralized IP management):</div>
                    <code># Create IPAM<br>
aws ec2 create-ipam \\<br>
  --description "Corporate IPAM" \\<br>
  --operating-regions RegionName=us-east-1 RegionName=us-west-2<br><br>
IPAM_ID=$(aws ec2 describe-ipams --query 'Ipams[0].IpamId' --output text)<br><br>
# Create IPAM pool for production<br>
aws ec2 create-ipam-pool \\<br>
  --ipam-scope-id ipam-scope-xxxxx \\<br>
  --description "Production VPCs" \\<br>
  --address-family ipv4 \\<br>
  --provisioned-cidrs Cidr=10.100.0.0/16</code>
                </div>
                
                <p><strong>Step 2: Create Production VPC</strong></p>
                <div class="code-block">
                    <div class="code-label">VPC with comprehensive tags:</div>
                    <code># Create VPC<br>
VPC_ID=$(aws ec2 create-vpc \\<br>
  --cidr-block 10.100.0.0/16 \\<br>
  --tag-specifications 'ResourceType=vpc,Tags=[<br>
    {Key=Name,Value=Production-VPC},<br>
    {Key=Environment,Value=Production},<br>
    {Key=ManagedBy,Value=Terraform},<br>
    {Key=CostCenter,Value=Engineering},<br>
    {Key=Compliance,Value=PCI-DSS},<br>
    {Key=DataClassification,Value=Confidential}<br>
  ]' \\<br>
  --query 'Vpc.VpcId' --output text)<br><br>
echo "VPC ID: $VPC_ID"<br><br>
# Enable DNS hostnames and resolution<br>
aws ec2 modify-vpc-attribute --vpc-id $VPC_ID --enable-dns-support<br>
aws ec2 modify-vpc-attribute --vpc-id $VPC_ID --enable-dns-hostnames</code>
                </div>
                
                <p><strong>Step 3: Create Subnets (Multi-AZ)</strong></p>
                <div class="code-block">
                    <div class="code-label">Subnet creation script (all 9 subnets):</div>
                    <code># Public subnets (for ALB, NAT GW)<br>
aws ec2 create-subnet --vpc-id $VPC_ID \\<br>
  --cidr-block 10.100.0.0/24 --availability-zone us-east-1a \\<br>
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Public-1a},{Key=Tier,Value=Public}]'<br><br>
aws ec2 create-subnet --vpc-id $VPC_ID \\<br>
  --cidr-block 10.100.64.0/24 --availability-zone us-east-1b \\<br>
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Public-1b},{Key=Tier,Value=Public}]'<br><br>
aws ec2 create-subnet --vpc-id $VPC_ID \\<br>
  --cidr-block 10.100.128.0/24 --availability-zone us-east-1c \\<br>
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Public-1c},{Key=Tier,Value=Public}]'<br><br>
# Private subnets (for EC2, ECS, Lambda)<br>
aws ec2 create-subnet --vpc-id $VPC_ID \\<br>
  --cidr-block 10.100.1.0/23 --availability-zone us-east-1a \\<br>
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Private-1a},{Key=Tier,Value=Private}]'<br><br>
aws ec2 create-subnet --vpc-id $VPC_ID \\<br>
  --cidr-block 10.100.65.0/23 --availability-zone us-east-1b \\<br>
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Private-1b},{Key=Tier,Value=Private}]'<br><br>
aws ec2 create-subnet --vpc-id $VPC_ID \\<br>
  --cidr-block 10.100.129.0/23 --availability-zone us-east-1c \\<br>
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Private-1c},{Key=Tier,Value=Private}]'<br><br>
# Data subnets (for RDS, ElastiCache, Redshift)<br>
aws ec2 create-subnet --vpc-id $VPC_ID \\<br>
  --cidr-block 10.100.3.0/24 --availability-zone us-east-1a \\<br>
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Data-1a},{Key=Tier,Value=Data}]'<br><br>
aws ec2 create-subnet --vpc-id $VPC_ID \\<br>
  --cidr-block 10.100.67.0/24 --availability-zone us-east-1b \\<br>
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Data-1b},{Key=Tier,Value=Data}]'<br><br>
aws ec2 create-subnet --vpc-id $VPC_ID \\<br>
  --cidr-block 10.100.131.0/24 --availability-zone us-east-1c \\<br>
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=Data-1c},{Key=Tier,Value=Data}]'</code>
                </div>
                
                <p><strong>Step 4: Internet Gateway and NAT Gateways</strong></p>
                <div class="code-block">
                    <div class="code-label">Create Internet Gateway:</div>
                    <code>IGW_ID=$(aws ec2 create-internet-gateway \\<br>
  --tag-specifications 'ResourceType=internet-gateway,Tags=[{Key=Name,Value=Production-IGW}]' \\<br>
  --query 'InternetGateway.InternetGatewayId' --output text)<br><br>
aws ec2 attach-internet-gateway --vpc-id $VPC_ID --internet-gateway-id $IGW_ID</code>
                </div>
                
                <div class="code-block">
                    <div class="code-label">Create NAT Gateways (one per AZ for HA):</div>
                    <code># Allocate Elastic IPs<br>
EIP_1A=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text)<br>
EIP_1B=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text)<br>
EIP_1C=$(aws ec2 allocate-address --domain vpc --query 'AllocationId' --output text)<br><br>
# Get public subnet IDs<br>
SUBNET_PUB_1A=$(aws ec2 describe-subnets --filters "Name=tag:Name,Values=Public-1a" \\<br>
  --query 'Subnets[0].SubnetId' --output text)<br>
SUBNET_PUB_1B=$(aws ec2 describe-subnets --filters "Name=tag:Name,Values=Public-1b" \\<br>
  --query 'Subnets[0].SubnetId' --output text)<br>
SUBNET_PUB_1C=$(aws ec2 describe-subnets --filters "Name=tag:Name,Values=Public-1c" \\<br>
  --query 'Subnets[0].SubnetId' --output text)<br><br>
# Create NAT Gateways<br>
NGW_1A=$(aws ec2 create-nat-gateway --subnet-id $SUBNET_PUB_1A \\<br>
  --allocation-id $EIP_1A \\<br>
  --tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=NAT-1a}]' \\<br>
  --query 'NatGateway.NatGatewayId' --output text)<br><br>
NGW_1B=$(aws ec2 create-nat-gateway --subnet-id $SUBNET_PUB_1B \\<br>
  --allocation-id $EIP_1B \\<br>
  --tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=NAT-1b}]' \\<br>
  --query 'NatGateway.NatGatewayId' --output text)<br><br>
NGW_1C=$(aws ec2 create-nat-gateway --subnet-id $SUBNET_PUB_1C \\<br>
  --allocation-id $EIP_1C \\<br>
  --tag-specifications 'ResourceType=natgateway,Tags=[{Key=Name,Value=NAT-1c}]' \\<br>
  --query 'NatGateway.NatGatewayId' --output text)<br><br>
# Wait for NAT Gateways to become available (takes 3-5 minutes)<br>
aws ec2 wait nat-gateway-available --nat-gateway-ids $NGW_1A $NGW_1B $NGW_1C</code>
                </div>
                
                <div class="warning-box">
                    <div class="warning-title">💰 Cost Alert: NAT Gateway Pricing</div>
                    <p><strong>NAT Gateway costs ~$45/month PER gateway ($0.045/hour)</strong><br>
                    3 NAT Gateways = $135/month base + data processing ($0.045/GB)<br>
                    For 10TB/month = $135 + $450 = $585/month just for NAT<br><br>
                    <strong>Cost Optimization Options:</strong><br>
                    • Use VPC endpoints for S3/DynamoDB (free, no NAT needed)<br>
                    • Use PrivateLink for other AWS services ($0.01/hour = $7.20/month per endpoint)<br>
                    • For dev/test: Single NAT Gateway (not HA, but saves $90/month)<br>
                    • For low-traffic: NAT Instance on t3.nano ($3.80/month vs $45)</p>
                </div>
                
                <p><strong>Step 5: Route Tables</strong></p>
                <div class="code-block">
                    <div class="code-label">Create and configure route tables:</div>
                    <code># Public route table (routes to IGW)<br>
RT_PUBLIC=$(aws ec2 create-route-table --vpc-id $VPC_ID \\<br>
  --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=Public-RT}]' \\<br>
  --query 'RouteTable.RouteTableId' --output text)<br><br>
aws ec2 create-route --route-table-id $RT_PUBLIC \\<br>
  --destination-cidr-block 0.0.0.0/0 --gateway-id $IGW_ID<br><br>
# Associate public subnets<br>
aws ec2 associate-route-table --route-table-id $RT_PUBLIC --subnet-id $SUBNET_PUB_1A<br>
aws ec2 associate-route-table --route-table-id $RT_PUBLIC --subnet-id $SUBNET_PUB_1B<br>
aws ec2 associate-route-table --route-table-id $RT_PUBLIC --subnet-id $SUBNET_PUB_1C<br><br>
# Private route tables (one per AZ, routes to respective NAT GW)<br>
RT_PRIVATE_1A=$(aws ec2 create-route-table --vpc-id $VPC_ID \\<br>
  --tag-specifications 'ResourceType=route-table,Tags=[{Key=Name,Value=Private-RT-1a}]' \\<br>
  --query 'RouteTable.RouteTableId' --output text)<br><br>
aws ec2 create-route --route-table-id $RT_PRIVATE_1A \\<br>
  --destination-cidr-block 0.0.0.0/0 --nat-gateway-id $NGW_1A<br><br>
SUBNET_PRIV_1A=$(aws ec2 describe-subnets --filters "Name=tag:Name,Values=Private-1a" \\<br>
  --query 'Subnets[0].SubnetId' --output text)<br>
SUBNET_DATA_1A=$(aws ec2 describe-subnets --filters "Name=tag:Name,Values=Data-1a" \\<br>
  --query 'Subnets[0].SubnetId' --output text)<br><br>
aws ec2 associate-route-table --route-table-id $RT_PRIVATE_1A --subnet-id $SUBNET_PRIV_1A<br>
aws ec2 associate-route-table --route-table-id $RT_PRIVATE_1A --subnet-id $SUBNET_DATA_1A<br><br>
# Repeat for AZ-1b and AZ-1c (connecting to NGW_1B and NGW_1C)</code>
                </div>
                
                <p><strong>Step 6: VPC Flow Logs (Security & Troubleshooting)</strong></p>
                <div class="code-block">
                    <div class="code-label">Enable comprehensive VPC Flow Logs:</div>
                    <code># Create S3 bucket for flow logs<br>
aws s3api create-bucket --bucket vpc-flowlogs-production-12345 --region us-east-1<br><br>
# Create IAM role for Flow Logs<br>
cat > flow-logs-trust-policy.json <<EOF<br>
{<br>
  "Version": "2012-10-17",<br>
  "Statement": [{<br>
    "Effect": "Allow",<br>
    "Principal": {"Service": "vpc-flow-logs.amazonaws.com"},<br>
    "Action": "sts:AssumeRole"<br>
  }]<br>
}<br>
EOF<br><br>
aws iam create-role --role-name VPCFlowLogsRole \\<br>
  --assume-role-policy-document file://flow-logs-trust-policy.json<br><br>
aws iam attach-role-policy --role-name VPCFlowLogsRole \\<br>
  --policy-arn arn:aws:iam::aws:policy/CloudWatchLogsFullAccess<br><br>
# Enable Flow Logs (ALL traffic, including ACCEPTED and REJECTED)<br>
aws ec2 create-flow-logs \\<br>
  --resource-type VPC \\<br>
  --resource-ids $VPC_ID \\<br>
  --traffic-type ALL \\<br>
  --log-destination-type s3 \\<br>
  --log-destination arn:aws:s3:::vpc-flowlogs-production-12345 \\<br>
  --max-aggregation-interval 60 \\<br>
  --log-format '${srcaddr} ${dstaddr} ${srcport} ${dstport} ${protocol} ${packets} ${bytes} ${start} ${end} ${action} ${log-status}'</code>
                </div>
                
                <div class="tip-box">
                    <div class="tip-title">🔍 VPC Flow Logs Use Cases</div>
                    <p><strong>Security:</strong> Detect unusual traffic patterns, identify compromised instances, audit compliance<br>
                    <strong>Troubleshooting:</strong> Diagnose connectivity issues, validate security group rules<br>
                    <strong>Cost:</strong> Identify high-bandwidth instances, optimize data transfer costs<br>
                    <strong>Analytics:</strong> Use Amazon Athena to query flow logs: "Which IPs are accessing my database?"</p>
                </div>
                
                <p><strong>Step 7: VPC Endpoints (Cost Optimization)</strong></p>
                <div class="code-block">
                    <div class="code-label">Create gateway endpoints (free):</div>
                    <code># S3 Gateway Endpoint (no charge, no data processing fees)<br>
aws ec2 create-vpc-endpoint \\<br>
  --vpc-id $VPC_ID \\<br>
  --service-name com.amazonaws.us-east-1.s3 \\<br>
  --route-table-ids $RT_PRIVATE_1A $RT_PRIVATE_1B $RT_PRIVATE_1C<br><br>
# DynamoDB Gateway Endpoint (free)<br>
aws ec2 create-vpc-endpoint \\<br>
  --vpc-id $VPC_ID \\<br>
  --service-name com.amazonaws.us-east-1.dynamodb \\<br>
  --route-table-ids $RT_PRIVATE_1A $RT_PRIVATE_1B $RT_PRIVATE_1C</code>
                </div>
                
                <div class="code-block">
                    <div class="code-label">Create interface endpoints (for other services):</div>
                    <code># EC2 Interface Endpoint (for Systems Manager, Instance Metadata Service)<br>
aws ec2 create-vpc-endpoint \\<br>
  --vpc-id $VPC_ID \\<br>
  --vpc-endpoint-type Interface \\<br>
  --service-name com.amazonaws.us-east-1.ec2 \\<br>
  --subnet-ids $SUBNET_PRIV_1A $SUBNET_PRIV_1B $SUBNET_PRIV_1C \\<br>
  --security-group-ids sg-xxxxx \\<br>
  --private-dns-enabled<br><br>
# Systems Manager endpoints (for Session Manager, no SSH bastion needed)<br>
for service in ssm ssmmessages ec2messages; do<br>
  aws ec2 create-vpc-endpoint \\<br>
    --vpc-id $VPC_ID \\<br>
    --vpc-endpoint-type Interface \\<br>
    --service-name com.amazonaws.us-east-1.$service \\<br>
    --subnet-ids $SUBNET_PRIV_1A $SUBNET_PRIV_1B $SUBNET_PRIV_1C \\<br>
    --security-group-ids sg-xxxxx \\<br>
    --private-dns-enabled<br>
done</code>
                </div>`,
                
                verify: `<ul class="checklist">
                    <li>VPC created with correct CIDR (10.100.0.0/16) and tagged properly</li>
                    <li>9 subnets created (3 public, 3 private, 3 data) across 3 AZs</li>
                    <li>Subnet CIDR blocks don't overlap and follow documented plan</li>
                    <li>Internet Gateway attached to VPC</li>
                    <li>3 NAT Gateways created (one per AZ) with Elastic IPs</li>
                    <li>Route tables configured: Public subnets → IGW, Private subnets → NAT GW (respective AZ)</li>
                    <li>VPC Flow Logs enabled (check S3 bucket has logs within 10 minutes)</li>
                    <li>VPC endpoints created for S3 and DynamoDB (verify with aws ec2 describe-vpc-endpoints)</li>
                    <li>DNS hostnames and DNS resolution enabled on VPC</li>
                    <li>No CIDR conflicts with on-premises network (confirm with network team)</li>
                    <li>VPC documented in IP Address Management (IPAM) system</li>
                    <li>Network ACLs are default (allow all) - use security groups for granular control</li>
                </ul>
                
                <div class="code-block">
                    <div class="code-label">Verification commands:</div>
                    <code># Test NAT Gateway connectivity from private subnet<br>
# Launch test EC2 in private subnet, then:<br>
curl -I https://aws.amazon.com  # Should succeed<br><br>
# Test VPC endpoint<br>
aws s3 ls --region us-east-1 --endpoint-url https://s3.us-east-1.amazonaws.com<br><br>
# Verify routing<br>
aws ec2 describe-route-tables --filters "Name=vpc-id,Values=$VPC_ID"</code>
                </div>
                
                <div class="tip-box">
                    <div class="tip-title">📚 Production Checklist: Network Documentation</div>
                    <p>Document in Confluence/SharePoint:<br>
                    • Network diagram (use draw.io, Lucidchart)<br>
                    • CIDR allocation table<br>
                    • Subnet to AZ mapping<br>
                    • NAT Gateway Elastic IPs (for firewall whitelisting)<br>
                    • VPC endpoint list<br>
                    • Transit Gateway attachments (if multi-VPC)<br>
                    • Direct Connect / VPN configuration<br>
                    • DNS forwarder rules (Route 53 Resolver)</p>
                </div>`
            }
        ]
    }
];
