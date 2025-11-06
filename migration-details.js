function getStepDetail(stepNum, source, dest) {
    const stepDetails = {
        1: {
            overview: `
                <div class="alert-box alert-info">
                    <strong>What is Discovery Assessment?</strong> Think of this like taking inventory of your entire home before moving. You need to know exactly what you have, where everything is, and how things are connected to each other. In cloud migration, we scan all your servers, applications, databases, and networks to create a complete map of your infrastructure.
                </div>
                <div class="prerequisite-box">
                    <h5>Before You Start</h5>
                    <ul>
                        <li>Admin access to your source environment (${source})</li>
                        <li>Network scanning permissions</li>
                        <li>Discovery tools installed (AWS Application Discovery Service, Azure Migrate, or similar)</li>
                        <li>At least 2 weeks for comprehensive discovery</li>
                        <li>Documentation access for all applications</li>
                    </ul>
                </div>
            `,
            howto: `
                <h4>Step-by-Step Instructions: Discovery Assessment</h4>
                <p style="font-size: 17px; color: var(--text-dim); margin-bottom: 25px;">Follow these instructions carefully. Each step is explained in simple terms so anyone can understand and execute the migration successfully.</p>

                <div class="instruction-section">
                    <h5>Phase 1: Install Discovery Tools</h5>
                    <ul class="instruction-list">
                        <li>
                            <strong>Download the discovery agent</strong><br>
                            Go to your cloud provider console (AWS, Azure, or GCP). Find the migration section. Download the discovery agent software. This is like installing a camera that will look at everything in your current system. For AWS, search for "AWS Application Discovery Agent". For Azure, look for "Azure Migrate appliance". Save the file to your computer.
                        </li>
                        <li>
                            <strong>Install the agent on your servers</strong><br>
                            Think of this step like placing sensors throughout your house. You need to install this small program on each of your servers. Log into each server using Remote Desktop or SSH. Run the installer file you downloaded. Click "Next" through the installation wizard. The agent will start automatically and begin collecting information about that server.
                        </li>
                        <li>
                            <strong>Configure agent settings</strong><br>
                            After installation, you need to tell the agent where to send information. Open the agent configuration file. Enter your cloud account credentials. This is like giving the camera permission to upload photos to your cloud storage. Set the data collection interval to every 15 minutes for detailed information.
                        </li>
                    </ul>
                </div>

                <div class="instruction-section">
                    <h5>Phase 2: Scan Your Infrastructure</h5>
                    <ul class="instruction-list">
                        <li>
                            <strong>Start network discovery scan</strong><br>
                            Go back to your cloud console. Click on "Start Discovery" or "Begin Assessment". The system will now scan your entire network. This is like the agent walking through every room of your house and making a list of everything it finds. This process takes several hours, so be patient. The scan looks for servers, databases, storage devices, and how they all talk to each other.
                        </li>
                        <li>
                            <strong>Identify all applications</strong><br>
                            While the scan runs, make a list of every application you use. Open a spreadsheet. Create columns for: Application Name, Server Location, Purpose, Users, and Dependencies. For example, if you have a customer database, write down "Customer DB", which server it runs on, that it stores customer information, how many people use it, and what other systems connect to it.
                        </li>
                        <li>
                            <strong>Map dependencies</strong><br>
                            This is the most important step. You need to understand which systems depend on each other. For example, your website might need your database to work. Your database might need your authentication service. Draw this out on paper or use a tool. Think of it like a family tree, but for your applications. If Application A cannot work without Application B, draw an arrow from A to B.
                        </li>
                    </ul>
                </div>

                <div class="instruction-section">
                    <h5>Phase 3: Collect Performance Data</h5>
                    <ul class="instruction-list">
                        <li>
                            <strong>Monitor CPU usage</strong><br>
                            Over the next two weeks, watch how hard your servers work. Open your monitoring tool. Look at the CPU graphs. Note the busiest times. For example, you might notice that every Monday morning at 9 AM, your servers work really hard because everyone logs in at once. Write down these peak times and the CPU percentages. This helps you choose the right size servers in the cloud.
                        </li>
                        <li>
                            <strong>Track memory consumption</strong><br>
                            Memory is like your computer short-term memory. Check how much RAM each server uses. If a server has 32GB of RAM but only uses 10GB, you can save money by choosing a smaller server in the cloud. If a server uses all its RAM and more, you need a bigger one. Record the average and peak memory usage for each server.
                        </li>
                        <li>
                            <strong>Measure storage needs</strong><br>
                            Check how much disk space you are using. But don't just look at today. Look at growth over time. If you are using 1TB today but growing by 100GB per month, plan for that growth. Also check how fast you read and write to disk. Some applications need very fast storage (like databases), others can use slower, cheaper storage (like old backups).
                        </li>
                    </ul>
                </div>

                <div class="instruction-section">
                    <h5>Phase 4: Document Everything</h5>
                    <ul class="instruction-list">
                        <li>
                            <strong>Create inventory spreadsheet</strong><br>
                            Make a master list of everything you found. Create an Excel or Google Sheets file. Have tabs for Servers, Applications, Databases, Storage, and Network. For each item, write down its name, purpose, size, location, dependencies, and current usage. This document becomes your migration blueprint. It is like a recipe book for rebuilding your infrastructure in the cloud.
                        </li>
                        <li>
                            <strong>Take configuration backups</strong><br>
                            Before changing anything, save copies of all your settings. Export firewall rules, export database configurations, save application settings. Put all these files in a safe place with clear labels and dates. If something goes wrong during migration, you can use these backups to restore your original setup.
                        </li>
                    </ul>
                </div>

                <div class="code-block">
# Example discovery commands for AWS
aws discovery start-continuous-export --region us-east-1

# Check discovery status
aws discovery describe-continuous-exports --region us-east-1

# Export discovered data
aws discovery export-configurations --region us-east-1

# For on-premise environments
nmap -sV -O 192.168.1.0/24
netstat -tulpn | grep LISTEN
</div>
            `,
            validation: `
                <h4>How to Verify Discovery is Complete</h4>
                <ul class="instruction-list">
                    <li>
                        <strong>Check discovery dashboard</strong><br>
                        Log into your cloud console. Open the discovery or migration section. Look for a dashboard or summary page. You should see green checkmarks or "Complete" status. Count the number of discovered servers. Does this match what you expected? If you know you have 50 servers but only 45 show up, something is missing. Go back and check which servers did not get scanned.
                    </li>
                    <li>
                        <strong>Review dependency map</strong><br>
                        The discovery tool should create a visual map showing how your systems connect. Click on different applications and see what they depend on. Make sure nothing is isolated unless it really should be. For example, if your website shows no connection to your database, that is wrong. The map should match your understanding of how things work.
                    </li>
                    <li>
                        <strong>Validate data completeness</strong><br>
                        Open your inventory spreadsheet. Go through each row. Make sure nothing is blank that should have data. Check that CPU, memory, and storage numbers make sense. If a server shows 0% CPU usage, that is probably wrong. Compare the discovered data with what you know is true. Fix any discrepancies before moving to the next step.
                    </li>
                    <li>
                        <strong>Get stakeholder approval</strong><br>
                        Show your discovery results to your team leads and managers. Walk them through what you found. Get their confirmation that you have captured everything important. Have them sign off or send email approval. This protects you later if someone says you missed something.
                    </li>
                </ul>

                <div class="alert-box alert-success">
                    <strong>Success Criteria:</strong> You have successfully completed discovery when you can answer these questions with confidence: How many servers do we have? What applications run where? What depends on what? How much resources do we use? Do we have complete documentation? If yes to all, move to step 2.
                </div>
            `
        },
        2: {
            overview: `
                <div class="alert-box alert-info">
                    <strong>What are Prerequisites?</strong> Before you can move into a new house, you need to set up utilities like electricity, water, and internet. Cloud migration is similar. You need to prepare your cloud account, set up security, create networks, and install necessary tools. This step ensures you have everything ready before you start moving workloads.
                </div>
                <div class="prerequisite-box">
                    <h5>What You Need</h5>
                    <ul>
                        <li>Cloud account created with billing enabled</li>
                        <li>Admin privileges in cloud console</li>
                        <li>Credit card or purchase order for cloud services</li>
                        <li>Company email domain verified</li>
                        <li>Multi-factor authentication device</li>
                        <li>Budget approval from finance team</li>
                    </ul>
                </div>
            `,
            howto: `
                <h4>Complete Cloud Environment Setup</h4>
                <p style="font-size: 17px; color: var(--text-dim); margin-bottom: 25px;">This step prepares your cloud environment. Think of it like getting your new house ready before moving day. We will set up accounts, security, networks, and tools.</p>

                <div class="instruction-section">
                    <h5>Part 1: Account Setup and Organization</h5>
                    <ul class="instruction-list">
                        <li>
                            <strong>Create master cloud account</strong><br>
                            Go to ${dest === 'aws' ? 'aws.amazon.com' : dest === 'azure' ? 'portal.azure.com' : 'console.cloud.google.com'}. Click "Create Account" or "Sign Up". Enter your company email address, not personal email. Choose a strong password with uppercase, lowercase, numbers, and symbols. Write this password in your company password manager immediately. Verify your email by clicking the link they send you.
                        </li>
                        <li>
                            <strong>Set up billing and payment</strong><br>
                            Click on "Billing" or "Payment Methods" in the console. Add a credit card or link to your company billing account. Set up billing alerts so you get notified if spending goes over budget. Create a budget of $500 for testing. This prevents surprises. Enter your company address and tax information. Save all receipts and confirmation emails.
                        </li>
                        <li>
                            <strong>Enable multi-factor authentication</strong><br>
                            Security is critical. Go to account settings. Find "Security" or "MFA". Click "Enable MFA". Choose an authenticator app like Google Authenticator or Microsoft Authenticator. Scan the QR code with your phone. The app will show a 6-digit code that changes every 30 seconds. Enter the code to confirm. Save the backup codes in a safe place. Now your account needs both password and phone code to log in.
                        </li>
                        <li>
                            <strong>Create organizational structure</strong><br>
                            Don't put everything in one account. Create separate accounts or subscriptions for development, testing, and production. Think of these like separate apartments in a building. Development is where you experiment, testing is where you verify things work, production is where real users access services. This separation prevents accidents where someone testing breaks production.
                        </li>
                    </ul>
                </div>

                <div class="instruction-section">
                    <h5>Part 2: Identity and Access Management</h5>
                    <ul class="instruction-list">
                        <li>
                            <strong>Create admin user accounts</strong><br>
                            Never use the root account for daily work. Create individual user accounts for each admin. Go to IAM (Identity and Access Management). Click "Add User". Enter the person name. Select "Programmatic access" and "Console access". Generate a password and require them to change it on first login. Assign the Admin policy but only to people who truly need full access.
                        </li>
                        <li>
                            <strong>Set up user groups</strong><br>
                            Create groups for different teams. Make a "DatabaseAdmins" group, a "NetworkAdmins" group, and a "Developers" group. Assign permissions to groups, not individual users. This is like giving keys to a department instead of each person. When someone joins the database team, just add them to DatabaseAdmins group and they get all the right permissions automatically.
                        </li>
                        <li>
                            <strong>Configure password policy</strong><br>
                            Go to IAM settings. Find password policy. Require minimum 14 characters. Require uppercase, lowercase, numbers, and symbols. Force password change every 90 days. Prevent reusing old passwords. Allow users to change their own passwords but require current password first. This keeps the environment secure and complies with security standards.
                        </li>
                        <li>
                            <strong>Enable audit logging</strong><br>
                            Turn on CloudTrail (AWS), Activity Log (Azure), or Cloud Logging (GCP). This records everything everyone does. If someone deletes something by mistake, you can see who did it and when. Configure it to save logs for at least 90 days. Send logs to a secure storage location that only security team can access. Set up alerts for suspicious activities like multiple failed login attempts.
                        </li>
                    </ul>
                </div>

                <div class="instruction-section">
                    <h5>Part 3: Network Infrastructure Setup</h5>
                    <ul class="instruction-list">
                        <li>
                            <strong>Create virtual network</strong><br>
                            Go to networking section of your console. Click "Create VPC" (AWS), "Create Virtual Network" (Azure), or "Create VPC" (GCP). Name it something clear like "Production-VPC". Choose an IP range like 10.0.0.0/16. This gives you 65,536 IP addresses to work with. Make sure this range doesn't overlap with your on-premise network IP ranges. Overlapping IPs cause connection problems later.
                        </li>
                        <li>
                            <strong>Design subnet strategy</strong><br>
                            Divide your virtual network into smaller subnets. Create a public subnet for things that need internet access like web servers. Create private subnets for databases and internal apps. For example, use 10.0.1.0/24 for public web servers, 10.0.2.0/24 for application servers, and 10.0.3.0/24 for databases. Put each subnet in a different availability zone for redundancy.
                        </li>
                        <li>
                            <strong>Set up internet gateway</strong><br>
                            Create an internet gateway. This is like installing the front door to your house. It lets things inside your network reach the internet and lets internet traffic reach your public resources. Attach the internet gateway to your VPC. Update your route tables to send internet traffic (0.0.0.0/0) to the internet gateway. Only public subnets should have this route, not private ones.
                        </li>
                        <li>
                            <strong>Configure network ACLs and security groups</strong><br>
                            Set up firewall rules. Network ACLs control traffic at subnet level. Security groups control traffic at server level. Start with deny-all rules. Then add specific allow rules only for what you need. For example, allow HTTPS (port 443) from internet to web servers. Allow database port (3306 for MySQL) from app servers to database servers only. Document every rule you create and why it exists.
                        </li>
                    </ul>
                </div>

                <div class="instruction-section">
                    <h5>Part 4: Tool Installation and Configuration</h5>
                    <ul class="instruction-list">
                        <li>
                            <strong>Install command-line tools</strong><br>
                            On your computer, install the cloud provider CLI. For AWS, download AWS CLI. For Azure, get Azure CLI. For GCP, install Google Cloud SDK. These tools let you manage cloud resources from your terminal. After installing, run "aws configure" or equivalent. Enter your access key, secret key, and default region. Test it by running a simple command like listing S3 buckets or virtual machines.
                        </li>
                        <li>
                            <strong>Set up migration tools</strong><br>
                            Install specialized migration tools. For server migration, get AWS MGN (Application Migration Service) or Azure Migrate. For database migration, install AWS DMS or Azure Database Migration Service. Download and install these agents on a management server in your on-premise network. This server will orchestrate the migration. Configure the tools with your cloud credentials so they can create resources in your cloud account.
                        </li>
                        <li>
                            <strong>Configure backup and recovery</strong><br>
                            Before migrating anything, set up backup systems. Enable automated backups for cloud resources. Configure backup retention policies. For critical data, keep backups for 30 days. For less critical data, 7 days might be enough. Set up a separate storage account or bucket just for backups. Enable versioning so you can go back to previous versions if needed.
                        </li>
                    </ul>
                </div>

                <div class="code-block">
# Configure AWS CLI
aws configure
AWS Access Key ID: YOUR_ACCESS_KEY
AWS Secret Access Key: YOUR_SECRET_KEY
Default region name: us-east-1
Default output format: json

# Create VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=Production-VPC}]'

# Create subnet
aws ec2 create-subnet --vpc-id vpc-xxxxxx --cidr-block 10.0.1.0/24 --availability-zone us-east-1a

# Create internet gateway
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway --vpc-id vpc-xxxxxx --internet-gateway-id igw-xxxxxx

# Enable CloudTrail
aws cloudtrail create-trail --name my-trail --s3-bucket-name my-bucket
aws cloudtrail start-logging --name my-trail
</div>
            `,
            validation: `
                <h4>Verify Prerequisites are Complete</h4>
                <ul class="instruction-list">
                    <li>
                        <strong>Test account access</strong><br>
                        Try logging in with each admin account you created. Verify MFA is working - it should ask for phone code. Try logging in with wrong password and make sure it blocks you. Try accessing resources you should have access to and verify you can. Try accessing something you shouldn't and make sure it denies you. This confirms access control is set up correctly.
                    </li>
                    <li>
                        <strong>Verify network connectivity</strong><br>
                        Launch a small test server in your new VPC. Try to ping it from your on-premise network. Try to reach it over VPN if you set one up. Launch another test server in private subnet. Verify it can reach internet through NAT gateway but internet cannot reach it directly. Delete these test servers when done. Successful connectivity confirms network is configured correctly.
                    </li>
                    <li>
                        <strong>Check security configurations</strong><br>
                        Review all security groups and firewall rules. Make sure there are no rules allowing access from 0.0.0.0/0 (anywhere on the internet) except for your public web servers on port 443. Check that logging and monitoring are enabled and working. Try to trigger an alert by doing something suspicious like failed logins. Confirm you receive the alert. This validates security is properly configured.
                    </li>
                    <li>
                        <strong>Run pre-migration checklist</strong><br>
                        Go through this checklist: Account created? Check. Billing configured? Check. Users and permissions set up? Check. Network created? Check. Subnets configured? Check. Security groups defined? Check. Tools installed? Check. Backups enabled? Check. If you can check all boxes, you are ready to proceed with migration.
                    </li>
                </ul>

                <div class="alert-box alert-success">
                    <strong>Ready for Migration:</strong> When you can log in securely, create and access cloud resources, have network connectivity working, and all tools installed and configured, you are ready to start migrating workloads. Take screenshots of your setup for documentation.
                </div>
            `
        },
        3: {
            overview: `
                <div class="alert-box alert-info">
                    <strong>What is Network Connectivity?</strong> Imagine building a bridge between your current office and your new office. Network connectivity creates secure tunnels between your on-premise data center and the cloud. This allows systems in both locations to talk to each other during and after migration. Without this connection, your on-premise apps cannot reach cloud resources and vice versa.
                </div>
            `,
            howto: `
                <h4>Establish Hybrid Network Connection</h4>
                <p style="font-size: 17px; color: var(--text-dim); margin-bottom: 25px;">We will create a secure, high-speed connection between your data center and cloud. This is essential for migration and for running hybrid applications that span both environments.</p>

                <div class="instruction-section">
                    <h5>Choose Your Connection Method</h5>
                    <ul class="instruction-list">
                        <li>
                            <strong>VPN for quick setup</strong><br>
                            A VPN (Virtual Private Network) is like a secret encrypted tunnel over the internet. It is quick to set up and cheap but slower than dedicated connections. Use VPN if you need to start migrating quickly or if your data transfer needs are small. VPN typically gives you 50-100 Mbps speed. Good for testing and small migrations. Not recommended for moving hundreds of gigabytes of data.
                        </li>
                        <li>
                            <strong>Direct Connect for production</strong><br>
                            AWS Direct Connect, Azure ExpressRoute, or Google Cloud Interconnect are physical cables directly connecting your network to the cloud provider data center. This is like having a private highway. Much faster (up to 100 Gbps), more reliable, lower latency. Takes 2-4 weeks to set up because physical cables must be installed. Costs more but worth it for production workloads and large data transfers.
                        </li>
                    </ul>
                </div>

                <div class="instruction-section">
                    <h5>VPN Setup Instructions</h5>
                    <ul class="instruction-list">
                        <li>
                            <strong>Create VPN gateway in cloud</strong><br>
                            In your cloud console, go to VPN section. Click "Create Virtual Private Gateway". Choose the VPN type (usually IPsec). Select your VPC. Name it clearly like "OnPrem-to-AWS-VPN". The system will assign it an IP address. Write down this IP address - you will need it to configure your on-premise side.
                        </li>
                        <li>
                            <strong>Configure customer gateway</strong><br>
                            This represents your on-premise VPN device. Enter your on-premise firewall or router public IP address. Choose BGP or static routing (BGP is better for dynamic routing). Enter your ASN (Autonomous System Number) if using BGP. Otherwise use 65000 as default. The system will generate VPN configuration files.
                        </li>
                        <li>
                            <strong>Download VPN configuration</strong><br>
                            Click "Download Configuration". Choose your firewall brand (Cisco, Palo Alto, FortiGate, etc). The system generates a configuration file specific to your device. This file contains all the settings, encryption keys, and IP addresses needed. Save this file securely - it contains sensitive information.
                        </li>
                        <li>
                            <strong>Configure on-premise firewall</strong><br>
                            Log into your on-premise firewall or VPN device. Go to VPN section. Create new VPN tunnel. Copy and paste the settings from the downloaded configuration file. This includes Phase 1 and Phase 2 IPsec settings, pre-shared keys, and routing information. Save the configuration. The tunnel should come up within a few minutes.
                        </li>
                        <li>
                            <strong>Update routing tables</strong><br>
                            Add routes so traffic knows to go through the VPN tunnel. On your on-premise network, add route: cloud network (10.0.0.0/16) goes to VPN tunnel. In your cloud route tables, add route: on-premise network (192.168.0.0/16) goes to virtual private gateway. This tells both sides how to reach each other.
                        </li>
                    </ul>
                </div>

                <div class="instruction-section">
                    <h5>Direct Connect Setup Instructions</h5>
                    <ul class="instruction-list">
                        <li>
                            <strong>Order Direct Connect circuit</strong><br>
                            Contact your cloud provider or network provider. Request a Direct Connect/ExpressRoute circuit. Choose the speed: 1 Gbps for smaller migrations, 10 Gbps for large enterprises. Choose the location closest to your data center. The provider will give you a Letter of Authorization (LOA) document. This takes 1-2 weeks to get approved.
                        </li>
                        <li>
                            <strong>Work with colocation provider</strong><br>
                            If your servers are in a colocation facility, give them the LOA. They will run a physical cable from your cabinet to the cloud provider meet-me room. This is actual physical cable installation and takes 2-4 weeks. They will give you a port assignment showing where the cable connects. Test the physical link to ensure it is working.
                        </li>
                        <li>
                            <strong>Create virtual interface</strong><br>
                            In cloud console, create a private virtual interface on your Direct Connect. Assign a VLAN ID (usually provided by network team). Configure BGP settings. Exchange BGP routes with cloud provider. This establishes Layer 3 connectivity. Configure IP addresses on both ends of the link. Usually /30 or /31 subnets are used (giving you 2 usable IPs).
                        </li>
                        <li>
                            <strong>Set up BGP routing</strong><br>
                            Configure BGP (Border Gateway Protocol) to automatically exchange routing information. Advertise your on-premise networks to the cloud. Accept routes from the cloud. Set up route preferences so critical traffic prefers Direct Connect over internet. Configure failover to VPN if Direct Connect goes down. This ensures high availability.
                        </li>
                    </ul>
                </div>

                <div class="code-block">
# Create VPN gateway (AWS example)
aws ec2 create-vpn-gateway --type ipsec.1 --amazon-side-asn 65000

# Attach VPN gateway to VPC
aws ec2 attach-vpn-gateway --vpn-gateway-id vgw-xxxxx --vpc-id vpc-xxxxx

# Create customer gateway
aws ec2 create-customer-gateway --type ipsec.1 --public-ip YOUR_PUBLIC_IP --bgp-asn 65000

# Create VPN connection
aws ec2 create-vpn-connection --type ipsec.1 --customer-gateway-id cgw-xxxxx --vpn-gateway-id vgw-xxxxx

# Check VPN connection status
aws ec2 describe-vpn-connections --vpn-connection-ids vpn-xxxxx
</div>
            `,
            validation: `
                <h4>Test Network Connectivity</h4>
                <ul class="instruction-list">
                    <li>
                        <strong>Verify tunnel is up</strong><br>
                        Check VPN status in cloud console. It should show "Available" or "Up". Check your on-premise firewall logs. Look for "Tunnel established" or similar message. Both tunnels should be up if you configured redundancy. If tunnel is down, check firewall rules, pre-shared keys, and IP addresses. Common issue is firewall blocking IPsec ports (UDP 500 and 4500).
                    </li>
                    <li>
                        <strong>Test basic connectivity</strong><br>
                        From an on-premise server, try to ping a cloud resource. Use the private IP address, not public. For example: ping 10.0.1.50. If ping works, connection is established. Try reverse direction: from cloud server, ping an on-premise server. Both directions should work. If ping fails, check security groups and network ACLs to ensure ICMP is allowed.
                    </li>
                    <li>
                        <strong>Test application protocols</strong><br>
                        Ping is not enough. Test actual application protocols. Try SSH (port 22) from on-premise to cloud server. Try database connections (port 3306 for MySQL). Try HTTP/HTTPS (ports 80/443). Try RDP (port 3389) for Windows servers. Each protocol should work over the VPN tunnel. If specific ports fail, check firewall rules for those ports.
                    </li>
                    <li>
                        <strong>Measure performance</strong><br>
                        Use iperf or similar tool to measure bandwidth and latency. Run iperf server on cloud side. Run iperf client on on-premise side. Check what speed you get. VPN should give 50-100 Mbps. Direct Connect should give close to your circuit speed. Check latency with ping. Should be under 50ms for most regions. High latency (over 100ms) indicates routing problems.
                    </li>
                    <li>
                        <strong>Test failover</strong><br>
                        If you set up redundant connections, test failover. Disable primary VPN tunnel on purpose. Verify traffic switches to secondary tunnel automatically. Check that applications continue working. Verify no data loss during failover. Re-enable primary tunnel and verify it comes back up. This confirms your redundancy works.
                    </li>
                </ul>

                <div class="alert-box alert-success">
                    <strong>Network Ready:</strong> When you can reliably connect from on-premise to cloud and back, at acceptable speeds and latencies, your network is ready for migration. Document all IP addresses, VPN settings, and routing configuration. Take screenshots of working connections for your records.
                </div>
            `
        }
    };

    // Generate generic content for steps 4-15 following same pattern
    const genericSteps = {
        4: { name: 'Data Migration', icon: '📄' },
        5: { name: 'Compute Migration', icon: '🖥' },
        6: { name: 'Database Migration', icon: '📦' },
        7: { name: 'Storage Migration', icon: '🗄' },
        8: { name: 'Application Migration', icon: '📦' },
        9: { name: 'Load Balancer Setup', icon: '⚖️' },
        10: { name: 'DNS Cutover', icon: '🌍' },
        11: { name: 'Testing Validation', icon: '✔️' },
        12: { name: 'Monitoring Setup', icon: '📊' },
        13: { name: 'Backup Configuration', icon: '💾' },
        14: { name: 'Cutover Execution', icon: '🚀' },
        15: { name: 'Post-Migration', icon: '⚙️' }
    };

    // Fill in remaining steps with appropriate content
    for (let i = 4; i <= 15; i++) {
        if (!stepDetails[i]) {
            stepDetails[i] = {
                overview: `
                    <div class="alert-box alert-info">
                        <strong>About ${genericSteps[i].name}:</strong> This critical migration phase focuses on ${genericSteps[i].name.toLowerCase()} tasks. Following a systematic approach ensures success and minimizes risk during this transition.
                    </div>
                `,
                howto: `
                    <h4>How to Execute ${genericSteps[i].name}</h4>
                    <p style="font-size: 17px; color: var(--text-dim); margin-bottom: 25px;">Detailed step-by-step instructions for ${genericSteps[i].name.toLowerCase()}. Each substep is explained in simple terms for successful execution.</p>

                    <div class="instruction-section">
                        <h5>Phase 1: Preparation</h5>
                        <ul class="instruction-list">
                            <li>Review all prerequisites and ensure previous steps are completed successfully</li>
                            <li>Gather necessary credentials, access permissions, and configuration files</li>
                            <li>Schedule maintenance windows with stakeholders and communicate timelines</li>
                            <li>Prepare rollback procedures in case issues arise during execution</li>
                        </ul>
                    </div>

                    <div class="instruction-section">
                        <h5>Phase 2: Execution</h5>
                        <ul class="instruction-list">
                            <li>Follow the cloud provider best practices documentation for ${genericSteps[i].name.toLowerCase()}</li>
                            <li>Execute migration commands or configurations step by step</li>
                            <li>Monitor progress continuously throughout the process</li>
                            <li>Document any issues encountered and resolutions applied</li>
                        </ul>
                    </div>

                    <div class="instruction-section">
                        <h5>Phase 3: Validation</h5>
                        <ul class="instruction-list">
                            <li>Verify all components are functioning as expected</li>
                            <li>Test connectivity and performance metrics</li>
                            <li>Confirm data integrity and completeness</li>
                            <li>Get sign-off from relevant stakeholders</li>
                        </ul>
                    </div>

                    <div class="code-block">
# Example commands for ${genericSteps[i].name}
cloud-genesis-cli execute --step ${i} --source ${source} --destination ${dest}

# Monitor progress
cloud-genesis-cli status --step ${i}

# Validate completion
cloud-genesis-cli validate --step ${i}
</div>
                `,
                validation: `
                    <h4>Validation Checklist for ${genericSteps[i].name}</h4>
                    <ul class="instruction-list">
                        <li>
                            <strong>Functional Testing</strong><br>
                            Verify all functionality works as expected in the cloud environment. Test critical workflows end-to-end.
                        </li>
                        <li>
                            <strong>Performance Verification</strong><br>
                            Measure response times, throughput, and resource utilization. Compare against baseline metrics.
                        </li>
                        <li>
                            <strong>Security Compliance</strong><br>
                            Confirm all security controls are in place and functioning correctly. Run security scans and address findings.
                        </li>
                        <li>
                            <strong>Documentation Complete</strong><br>
                            Update all documentation with cloud configurations. Document any deviations from original plan.
                        </li>
                    </ul>

                    <div class="alert-box alert-success">
                        <strong>Step Complete:</strong> When all validation checks pass and stakeholders sign off, this step is complete. Document lessons learned before proceeding.
                    </div>
                `
            };
        }
    }

    return stepDetails[stepNum] || stepDetails[1];
}
