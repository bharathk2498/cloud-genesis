const migrationGuides = {
    1: `
        <div class="detailed-header">
            <h2>Step 1: Discovery and Assessment</h2>
            <p class="step-meta">Understanding what you have before you move it</p>
        </div>

        <div class="section-block">
            <h3>What is Discovery and Assessment?</h3>
            <p>Think of this like making a list of everything in your house before you move. You need to know what you have, where it is, how much it weighs, and what you need to move it safely.</p>
            
            <h4>Why This Step Matters</h4>
            <p>Imagine trying to move to a new house without knowing how many rooms you need or what furniture you have. That would be chaotic! The same applies to cloud migration. This step helps you understand exactly what you are moving to the cloud.</p>
        </div>

        <div class="section-block">
            <h3>Step-by-Step Instructions</h3>
            
            <h4>Part 1: Install Discovery Tools</h4>
            <p>Discovery tools are like having a smart assistant that walks through your datacenter and writes down everything it sees.</p>
            
            <ol>
                <li><strong>Choose Your Discovery Tool:</strong> For AWS migrations, use AWS Application Discovery Service. For Azure, use Azure Migrate. For Google Cloud, use Migrate for Compute Engine assessment tool.</li>
                <li><strong>Download the Agent:</strong> Go to your cloud provider console and download the discovery agent. This is a small program that will run on your servers.</li>
                <li><strong>Install on Each Server:</strong> Log into each server you want to migrate. Run the installer program. The agent will start collecting information automatically.</li>
            </ol>

            <div class="example-box">
                <h5>Simple Example</h5>
                <p>John has 10 servers in his office. He downloads the AWS Discovery Agent. He logs into Server 1, runs the installer, and the agent starts working. He repeats this for all 10 servers. After 24 hours, he has a complete picture of what each server does.</p>
            </div>

            <h4>Part 2: Let the Tools Gather Data</h4>
            <p>After you install the agents, they need time to watch and learn about your servers.</p>
            
            <ol>
                <li><strong>Wait 24-48 Hours:</strong> The tools need to see how your servers behave during normal business hours, busy times, and quiet times.</li>
                <li><strong>Don't Make Changes:</strong> During this time, try not to add new software or change server settings. Let the tools see your normal operations.</li>
                <li><strong>Check the Dashboard:</strong> Log into your cloud provider console every day to see what data has been collected.</li>
            </ol>

            <div class="warning-box">
                <h5>Important Warning</h5>
                <p>If you skip this waiting period, you might miss important patterns. For example, you might not know that Server 3 gets very busy every Monday morning. This could cause problems later.</p>
            </div>

            <h4>Part 3: Review the Inventory</h4>
            <p>Now you need to look at all the information collected and understand it.</p>
            
            <ol>
                <li><strong>Open the Inventory Report:</strong> In your cloud console, find the section called Inventory or Assessment Report.</li>
                <li><strong>Look at Each Server:</strong> You will see information like: How much memory it uses, how much disk space it has, what software is installed, which other servers it talks to.</li>
                <li><strong>Make a Spreadsheet:</strong> Create a simple spreadsheet with columns for Server Name, Operating System, Memory, Disk Space, and Important Applications.</li>
                <li><strong>Fill in the Details:</strong> Copy information from the discovery tool into your spreadsheet. This creates a simple reference document.</li>
            </ol>

            <h4>Part 4: Identify Dependencies</h4>
            <p>Dependencies are connections between servers. If Server A talks to Server B, they are dependent on each other.</p>
            
            <ol>
                <li><strong>Look at the Network Map:</strong> Your discovery tool will show a diagram of how servers connect to each other.</li>
                <li><strong>Draw Your Own Map:</strong> On paper or in a drawing program, make boxes for each server. Draw arrows showing which servers talk to which.</li>
                <li><strong>Mark Critical Connections:</strong> Some connections are critical. For example, your web server needs to talk to your database. Mark these with red arrows.</li>
                <li><strong>Note Timing:</strong> Some servers only talk to each other at certain times. For example, your backup server might connect to all other servers at night. Write this down.</li>
            </ol>

            <div class="example-box">
                <h5>Dependency Example</h5>
                <p>Sarah discovers that her email server connects to 3 different systems: The user database every time someone logs in, the file server when someone attaches a file, the antivirus server to scan attachments. She draws this out and realizes she needs to migrate all 4 systems together or her email will break.</p>
            </div>

            <h4>Part 5: Calculate Current Costs</h4>
            <p>Before you move, you need to know how much you are spending now.</p>
            
            <ol>
                <li><strong>Find Your Server Bills:</strong> Look at what you pay for electricity, cooling, and space in your datacenter.</li>
                <li><strong>Calculate per Server:</strong> If you have 10 servers and pay $1000 per month total, each server costs about $100 per month.</li>
                <li><strong>Include Hidden Costs:</strong> Don't forget to include salaries for people who maintain the servers, backup costs, and security software licenses.</li>
                <li><strong>Write Everything Down:</strong> Create a total monthly cost. This will help you compare with cloud costs later.</li>
            </ol>

            <h4>Part 6: Assess Migration Readiness</h4>
            <p>Not everything can move to the cloud easily. You need to check if each application is ready.</p>
            
            <ol>
                <li><strong>Check Application Compatibility:</strong> Look at each application and ask: Is it supported in the cloud? Does it need special hardware? Can it run on newer operating systems?</li>
                <li><strong>Test Small Changes:</strong> If possible, try updating one application to a newer version on a test server. This helps you see if there will be problems.</li>
                <li><strong>Rate Each Application:</strong> Give each application a score: Easy to migrate means it can move with no changes, Medium means it needs small updates, Hard means it needs major changes or cannot move at all.</li>
                <li><strong>Make Priority Lists:</strong> Decide which applications to move first. Usually, you start with easy ones to gain experience.</li>
            </ol>
        </div>

        <div class="section-block">
            <h3>Common Mistakes to Avoid</h3>
            <ul>
                <li><strong>Rushing the Discovery:</strong> Taking only one day to assess is not enough. You need to see weekly and monthly patterns.</li>
                <li><strong>Ignoring Old Servers:</strong> That old server in the corner that nobody talks about might be running something critical. Check everything.</li>
                <li><strong>Not Documenting:</strong> If you only keep information in your head, you will forget important details. Write everything down.</li>
                <li><strong>Skipping Dependencies:</strong> Moving one server without its dependent servers is like moving your refrigerator but leaving your kitchen sink behind. Both are needed.</li>
            </ul>
        </div>

        <div class="tip-box">
            <h5>Pro Tips</h5>
            <p>Take screenshots of everything. Your discovery tool might not save data forever. Print or save PDF copies of all reports. Involve your application owners early. They know things about their applications that tools cannot detect. Create a questions document for things you don't understand and research them before moving forward.</p>
        </div>

        <div class="section-block">
            <h3>What Success Looks Like</h3>
            <p>You know you have successfully completed this step when you can answer these questions without looking anything up: How many servers do we have? What does each server do? Which servers must stay together? How much do we spend now? What are our three biggest applications?</p>
            
            <p>You should have a folder or binder with all your documentation, reports, spreadsheets, network diagrams, cost calculations, and application compatibility assessments. You should be able to explain your infrastructure to someone who has never seen it before.</p>
        </div>

        <div class="action-buttons">
            <button class="btn" onclick="backToStepList()">← Back to Migration Steps</button>
        </div>
    `,

    2: `
        <div class="detailed-header">
            <h2>Step 2: Prerequisites Setup</h2>
            <p class="step-meta">Getting your cloud accounts and tools ready</p>
        </div>

        <div class="section-block">
            <h3>What Are Prerequisites?</h3>
            <p>Prerequisites are things you need to have ready before you start the actual migration. Think of it like preparing ingredients before you cook. You need your cloud account set up, your tools installed, and your team trained before you can start moving servers.</p>
        </div>

        <div class="section-block">
            <h3>Step-by-Step Instructions</h3>
            
            <h4>Part 1: Create Cloud Account</h4>
            <p>The first thing you need is an account with your cloud provider.</p>
            
            <ol>
                <li><strong>Go to the Cloud Provider Website:</strong> For AWS go to aws.amazon.com, for Azure go to azure.microsoft.com, for Google Cloud go to cloud.google.com.</li>
                <li><strong>Click Sign Up or Create Account:</strong> Look for the big button that says Sign Up or Get Started.</li>
                <li><strong>Enter Your Business Information:</strong> You will need company name, billing address, phone number, and credit card information.</li>
                <li><strong>Verify Your Identity:</strong> The cloud provider will send you a text message or call you to verify your phone number.</li>
                <li><strong>Wait for Approval:</strong> Most accounts activate immediately, but some business accounts need 24-48 hours for approval.</li>
            </ol>

            <div class="warning-box">
                <h5>Billing Alert</h5>
                <p>Set up billing alerts immediately! Tell the system to email you if spending goes over $100, $500, and $1000. This prevents surprise bills.</p>
            </div>

            <h4>Part 2: Set Up User Accounts</h4>
            <p>You need separate accounts for different team members. Never share one login.</p>
            
            <ol>
                <li><strong>Go to IAM or Access Management:</strong> In your cloud console, find the section for managing users. In AWS it is called IAM, in Azure it is Azure AD, in Google Cloud it is IAM.</li>
                <li><strong>Create Admin User:</strong> Create one administrator account. This person will have full control. Make the password very strong: at least 16 characters with numbers, symbols, and mixed case.</li>
                <li><strong>Enable Two-Factor Authentication:</strong> This adds extra security. The admin will need their password plus a code from their phone to log in.</li>
                <li><strong>Create Regular User Accounts:</strong> Create accounts for each team member who will help with the migration. Give them only the permissions they need, not full administrator access.</li>
                <li><strong>Document All Accounts:</strong> Keep a secure list of who has which account. Store this list in a password manager like 1Password or LastPass.</li>
            </ol>

            <h4>Part 3: Install Migration Tools</h4>
            <p>You need special software on your computer to control the migration.</p>
            
            <ol>
                <li><strong>Download CLI Tool:</strong> CLI means Command Line Interface. It is a way to control the cloud from your computer. Download it from your cloud provider's website.</li>
                <li><strong>Install on Your Computer:</strong> Run the installer file. On Windows, double-click the .exe file. On Mac, drag the application to your Applications folder. On Linux, follow the terminal commands provided.</li>
                <li><strong>Configure with Your Credentials:</strong> Open a terminal or command prompt. Run the configuration command. You will enter your Access Key and Secret Key from your cloud account.</li>
                <li><strong>Test the Connection:</strong> Run a simple test command to make sure your computer can talk to the cloud. For AWS try: aws s3 ls. For Azure try: az account list. For Google Cloud try: gcloud projects list.</li>
            </ol>

            <div class="example-box">
                <h5>Testing Example</h5>
                <p>Maria installs the AWS CLI tool. She opens the command prompt and types aws s3 ls. She sees a list of storage buckets appear on her screen. This confirms her tool is working correctly and she can proceed.</p>
            </div>

            <h4>Part 4: Create Resource Groups or Projects</h4>
            <p>Think of these as folders to organize all your cloud stuff.</p>
            
            <ol>
                <li><strong>Decide on Organization Structure:</strong> Usually you create one group per environment. For example: Production, Development, Testing.</li>
                <li><strong>Create the First Group:</strong> In your cloud console, find the section for Resource Groups or Projects. Click Create New.</li>
                <li><strong>Name It Clearly:</strong> Use names like MyCompany-Production or AppName-Testing. Good names help you find things later.</li>
                <li><strong>Set the Region:</strong> Choose where your data will physically live. Pick a region close to your users for better performance.</li>
                <li><strong>Apply Tags:</strong> Tags are labels. Add tags like Environment: Production, Owner: IT Department, Cost-Center: Engineering. These help with organization and billing.</li>
            </ol>

            <h4>Part 5: Set Up Monitoring and Logging</h4>
            <p>Before you move anything, you need to set up systems to watch what happens.</p>
            
            <ol>
                <li><strong>Enable CloudWatch, Azure Monitor, or Cloud Logging:</strong> These are the built-in monitoring services. Turn them on in your console.</li>
                <li><strong>Create a Log Storage Location:</strong> Logs are like a diary of everything that happens. Create a storage bucket or log analytics workspace to store them.</li>
                <li><strong>Set Up Alerts:</strong> Tell the system to send you emails if something goes wrong. For example: Alert me if any server uses more than 80% memory or Alert me if any server stops responding.</li>
                <li><strong>Test the Alerts:</strong> Create a test alert to make sure emails are working. You don't want to discover alert emails are broken during a real emergency.</li>
            </ol>

            <h4>Part 6: Establish Security Baseline</h4>
            <p>Security must be set up before you move any data.</p>
            
            <ol>
                <li><strong>Enable Encryption:</strong> Turn on encryption for all storage. This means all your data will be scrambled and unreadable without the proper key.</li>
                <li><strong>Set Up Firewall Rules:</strong> Create rules that control what traffic can reach your cloud. Block everything by default, then only allow what you need.</li>
                <li><strong>Configure Backup System:</strong> Even in the cloud, you need backups. Set up automatic daily backups of everything important.</li>
                <li><strong>Create Security Groups:</strong> These are like invisible walls around your servers. Only allow specific types of traffic through specific ports.</li>
            </ol>

            <div class="warning-box">
                <h5>Security Warning</h5>
                <p>Never open port 22 (SSH) or port 3389 (RDP) to the entire internet. This is like leaving your front door unlocked. Only allow connections from your office IP address.</p>
            </div>

            <h4>Part 7: Train Your Team</h4>
            <p>Everyone involved needs to understand the basics of the cloud platform.</p>
            
            <ol>
                <li><strong>Schedule Training Sessions:</strong> Set aside 2-3 hours for initial training. Do not rush this. Understanding the platform prevents mistakes.</li>
                <li><strong>Cover Basic Concepts:</strong> Teach your team about regions, availability zones, resource groups, and basic networking. Use simple language and examples.</li>
                <li><strong>Practice in Test Environment:</strong> Let team members practice creating and deleting test resources. Mistakes in the test environment are fine and help learning.</li>
                <li><strong>Create Cheat Sheets:</strong> Make simple one-page guides with the most common commands and procedures. Print these and put them on desks.</li>
                <li><strong>Assign Roles:</strong> Make sure everyone knows their job. Who is responsible for networking? Who handles database migration? Who is the main point of contact?</li>
            </ol>
        </div>

        <div class="section-block">
            <h3>Checklist for Completion</h3>
            <p>You have completed prerequisites when you can check yes to all of these:</p>
            <ul>
                <li>Cloud account is active and billing is set up</li>
                <li>At least two people have working login accounts with two-factor authentication</li>
                <li>CLI tools are installed and tested on at least one computer</li>
                <li>Resource groups or projects are created and properly tagged</li>
                <li>Monitoring and alerts are enabled and tested</li>
                <li>Basic security rules are in place</li>
                <li>Team members understand their roles and basic cloud concepts</li>
                <li>Test resources can be created and deleted successfully</li>
            </ul>
        </div>

        <div class="tip-box">
            <h5>Pro Tips</h5>
            <p>Document everything as you go. Take screenshots of every configuration screen. Save all confirmation emails from the cloud provider. Create a migration email group so all communication is shared. Set up a shared document or wiki where team members can add notes and questions. Test everything twice before moving to the next step.</p>
        </div>

        <div class="action-buttons">
            <button class="btn" onclick="backToStepList()">← Back to Migration Steps</button>
        </div>
    `,

    3: `
        <div class="detailed-header">
            <h2>Step 3: Network Connectivity Setup</h2>
            <p class="step-meta">Building the highway between your office and the cloud</p>
        </div>

        <div class="section-block">
            <h3>What is Network Connectivity?</h3>
            <p>Network connectivity is how you create a secure tunnel from your office to the cloud. Imagine building a private underground tunnel from your house to a shopping mall so you can go back and forth safely and quickly. This is what we are doing with your data center and the cloud.</p>
        </div>

        <div class="section-block">
            <h3>Complete Step-by-Step Instructions</h3>
            
            <h4>Part 1: Understand Your Options</h4>
            <p>There are three main ways to connect to the cloud. Each has advantages and disadvantages.</p>
            
            <div class="example-box">
                <h5>Option 1: VPN (Virtual Private Network)</h5>
                <p>This is like a secure phone call over the internet. It is the cheapest and fastest to set up. However, it uses the public internet so it can be slower during busy times. Good for testing and small migrations. Setup time: 1-2 hours. Cost: $50-100 per month.</p>
            </div>

            <div class="example-box">
                <h5>Option 2: Direct Connect / ExpressRoute / Cloud Interconnect</h5>
                <p>This is like having your own private highway. A physical cable connects your building directly to the cloud data center. It is faster and more reliable than VPN but costs more. Good for large migrations and permanent connections. Setup time: 2-6 weeks. Cost: $500-2000 per month.</p>
            </div>

            <div class="example-box">
                <h5>Option 3: Hybrid (VPN + Direct Connect)</h5>
                <p>Use VPN for quick setup while you wait for the direct connection to be installed. Once direct connect is ready, keep the VPN as a backup in case the main connection fails.</p>
            </div>

            <h4>Part 2: Set Up VPN Connection (Quick Start Method)</h4>
            <p>We will walk through setting up a VPN first since it is the fastest way to get started.</p>
            
            <ol>
                <li><strong>Find Your Office Router:</strong> This is the box in your server room that connects your office to the internet. You need its public IP address. Open a web browser and go to whatismyip.com to find your office's public IP address. Write this number down.</li>
                <li><strong>Create Virtual Private Gateway in Cloud:</strong> Go to your cloud console. In AWS go to VPC then Virtual Private Gateway. In Azure go to Virtual Network Gateway. In Google Cloud go to Cloud VPN. Click Create New.</li>
                <li><strong>Configure the Gateway:</strong> Give it a name like Office-to-Cloud-VPN. Select IPSec VPN as the type. Enter your office router's public IP address when asked for the customer gateway IP. Save the configuration.</li>
                <li><strong>Download Configuration File:</strong> The cloud will create a configuration file. This file has all the settings your router needs. Download this file. It will be named something like vpn-config.txt.</li>
                <li><strong>Apply Settings to Your Router:</strong> Log into your office router's admin panel. This usually involves opening a web browser and going to an address like 192.168.1.1. The username is often admin and the password might be printed on the router. Find the VPN section. There should be an option to import a configuration file. Upload the file you downloaded. Click Apply or Save.</li>
                <li><strong>Wait for Connection:</strong> The tunnel takes 2-5 minutes to establish. You will see the status change from Disconnected to Connected in both your router and the cloud console.</li>
            </ol>

            <div class="warning-box">
                <h5>Important: Save Backup of Settings</h5>
                <p>Before you change anything on your router, save a complete backup of its current settings. If something goes wrong, you can restore the backup and your internet will work again.</p>
            </div>

            <h4>Part 3: Test the VPN Connection</h4>
            <p>You must verify the tunnel is working correctly before using it.</p>
            
            <ol>
                <li><strong>Create Test Server in Cloud:</strong> Create a small virtual machine in your cloud account. Choose the smallest size available. Install a simple web server on it.</li>
                <li><strong>Try to Ping from Office:</strong> From a computer in your office, open command prompt or terminal. Type: ping 10.0.1.5 (replace with your cloud server's private IP address). If you see replies, the tunnel is working!</li>
                <li><strong>Try to Access from Cloud:</strong> Log into your cloud test server. Try to ping one of your office servers. If you see replies both ways, you have bidirectional connectivity.</li>
                <li><strong>Test Speed:</strong> Use a speed test tool to check bandwidth. You should be able to transfer at least 50 Mbps. If it is slower, there might be a configuration issue.</li>
            </ol>

            <h4>Part 4: Configure Cloud Networking</h4>
            <p>Now you need to set up the network structure in the cloud.</p>
            
            <ol>
                <li><strong>Create Virtual Network:</strong> In AWS this is called VPC, in Azure it is VNet, in Google Cloud it is VPC Network. Go to that section in your console. Click Create New. Give it a name like MyCompany-Production-Network. Choose an IP address range like 10.0.0.0/16. This gives you 65,000 possible IP addresses to use.</li>
                <li><strong>Create Subnets:</strong> Subnets divide your big network into smaller sections. Create at least three subnets: Public subnet 10.0.1.0/24 for things that need internet access like web servers, Private subnet 10.0.2.0/24 for things that should not be directly accessible from internet like databases, Management subnet 10.0.3.0/24 for administration and monitoring tools.</li>
                <li><strong>Set Up Internet Gateway:</strong> This allows your cloud resources to access the internet. Create an Internet Gateway and attach it to your virtual network. Edit your public subnet route table to send internet traffic through this gateway.</li>
                <li><strong>Create NAT Gateway:</strong> This allows private subnet resources to access the internet for updates but prevents internet from accessing them directly. Create a NAT Gateway in your public subnet. Update private subnet route table to send outbound internet traffic through the NAT Gateway.</li>
            </ol>

            <h4>Part 5: Configure Security Rules</h4>
            <p>Security rules control what traffic is allowed.</p>
            
            <ol>
                <li><strong>Create Security Groups:</strong> Think of these as virtual firewalls. Create separate security groups for web servers, application servers, and database servers.</li>
                <li><strong>Configure Web Server Rules:</strong> Allow inbound traffic on port 443 from the internet. Allow inbound traffic on port 22 only from your office IP address. Allow outbound traffic to anywhere for updates.</li>
                <li><strong>Configure Database Rules:</strong> Allow inbound traffic on port 3306 or 1433 only from application servers. Deny all other inbound traffic. Allow outbound traffic only to your office through the VPN.</li>
                <li><strong>Test Each Rule:</strong> Try to connect to each server. Make sure allowed traffic works and blocked traffic is rejected.</li>
            </ol>

            <div class="example-box">
                <h5>Security Rule Example</h5>
                <p>Tom creates a rule for his database server. He allows port 3306 from 10.0.2.0/24 which is his application subnet. He tries to connect from his office and it fails as expected because office traffic is not in that subnet. He tries to connect from the application server and it succeeds. Perfect!</p>
            </div>

            <h4>Part 6: Set Up DNS</h4>
            <p>DNS translates names like database.mycompany.com into IP addresses.</p>
            
            <ol>
                <li><strong>Create Private DNS Zone:</strong> In your cloud console, go to DNS services. Create a new private DNS zone. Name it something like internal.mycompany.com.</li>
                <li><strong>Add DNS Records:</strong> For each cloud server, create an A record that points the name to its IP address. For example: database.internal.mycompany.com points to 10.0.2.5.</li>
                <li><strong>Configure Office DNS:</strong> Update your office DNS server to forward queries for internal.mycompany.com to the cloud DNS service.</li>
                <li><strong>Test Name Resolution:</strong> From your office, try to ping database.internal.mycompany.com. It should resolve to the correct IP address and respond.</li>
            </ol>

            <h4>Part 7: Document Everything</h4>
            <p>Network documentation is critical for troubleshooting.</p>
            
            <ol>
                <li><strong>Create Network Diagram:</strong> Draw a picture showing all networks, subnets, gateways, and connections. Use different colors for public and private subnets.</li>
                <li><strong>List All IP Addresses:</strong> Create a spreadsheet with columns for Device Name, IP Address, Subnet, Purpose, and Security Group.</li>
                <li><strong>Document Firewall Rules:</strong> Create a table showing what traffic is allowed where. Include source, destination, port, and why the rule exists.</li>
                <li><strong>Write Troubleshooting Guide:</strong> Document what to check if the VPN goes down or if connectivity stops working. Include commands to run and who to contact.</li>
            </ol>
        </div>

        <div class="section-block">
            <h3>Common Problems and Solutions</h3>
            <ul>
                <li><strong>VPN Keeps Disconnecting:</strong> This usually means the router is rebooting or internet is unstable. Check router logs. Consider upgrading router firmware or switching to direct connect.</li>
                <li><strong>Can Ping But Cannot Access Services:</strong> This means network is working but firewall rules are blocking application ports. Review security group rules and add the needed ports.</li>
                <li><strong>Slow Performance:</strong> VPN performance depends on internet speed. Run speed tests. If internet is slow, consider upgrading or using direct connect.</li>
                <li><strong>Cannot Resolve DNS Names:</strong> Make sure DNS forwarders are configured correctly. Test with nslookup or dig commands to see where DNS requests are going.</li>
            </ul>
        </div>

        <div class="tip-box">
            <h5>Pro Tips</h5>
            <p>Always test during business hours first so if something breaks you have time to fix it. Keep your old network running until the new one is proven stable. Never make changes on Friday afternoon. Use monitoring tools to watch network performance constantly. Set up alerts for VPN disconnections. Keep spare routers configured and ready in case primary fails.</p>
        </div>

        <div class="action-buttons">
            <button class="btn" onclick="backToStepList()">← Back to Migration Steps</button>
        </div>
    `
};

// Add more migration guides for steps 4-15 with similar detailed structure
for (let i = 4; i <= 15; i++) {
    migrationGuides[i] = `
        <div class="detailed-header">
            <h2>Step ${i}: ${getMigrationStepName(i)}</h2>
            <p class="step-meta">Detailed guide coming soon - comprehensive documentation for this migration phase</p>
        </div>

        <div class="section-block">
            <h3>Overview</h3>
            <p>This step involves critical migration activities for ${getMigrationStepName(i)}. Detailed step-by-step instructions will be added here following the same beginner-friendly format as the previous steps.</p>
            
            <div class="alert-box alert-info">
                <strong>In Development:</strong> Complete detailed guides for steps 4-15 are being developed with the same level of detail as steps 1-3. Each will include simple explanations, step-by-step instructions, examples, warnings, and troubleshooting tips.
            </div>
        </div>

        <div class="action-buttons">
            <button class="btn" onclick="backToStepList()">← Back to Migration Steps</button>
        </div>
    `;
}

function getMigrationStepName(stepNum) {
    const steps = {
        1: 'Discovery Assessment',
        2: 'Prerequisites',
        3: 'Network Connectivity',
        4: 'Data Migration',
        5: 'Compute Migration',
        6: 'Database Migration',
        7: 'Storage Migration',
        8: 'Application Migration',
        9: 'Load Balancer Setup',
        10: 'DNS Cutover',
        11: 'Testing Validation',
        12: 'Monitoring Setup',
        13: 'Backup Configuration',
        14: 'Cutover Execution',
        15: 'Post-Migration'
    };
    return steps[stepNum] || 'Migration Step';
}