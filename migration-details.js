// Ultra-detailed enterprise migration guides
// Each step includes: Overview, Prerequisites, Detailed Steps, Validation, Troubleshooting, and Best Practices

const migrationGuides = {
    1: {
        title: "Discovery & Assessment",
        duration: "3-5 Days",
        difficulty: "Beginner",
        icon: "🔍",
        overview: `
            <div class="step-overview-card">
                <div class="overview-header">
                    <span class="step-badge beginner">👶 Beginner Friendly</span>
                    <span class="time-badge">⏱️ 3-5 Days</span>
                    <span class="priority-badge high">🔥 Critical Step</span>
                </div>
                <h3>What You'll Learn</h3>
                <p>Think of this like taking inventory before moving houses. You need to know exactly what you have, where it is, and how everything connects together.</p>
                
                <div class="learning-objectives">
                    <h4>✅ By the end of this step, you will:</h4>
                    <ul>
                        <li>Have a complete list of all servers and applications</li>
                        <li>Understand how your applications talk to each other</li>
                        <li>Know exactly how much everything costs right now</li>
                        <li>Identify which applications are easy to move and which are difficult</li>
                        <li>Create a detailed migration plan</li>
                    </ul>
                </div>

                <div class="why-important">
                    <h4>🎯 Why This Step is Critical</h4>
                    <p>Imagine trying to move to a new house without knowing how many rooms you need or what furniture you have. That would be chaos! The same applies to cloud migration. This step prevents costly mistakes and ensures nothing gets forgotten.</p>
                </div>
            </div>
        `,
        
        prerequisites: `
            <div class="prerequisites-card">
                <h3>📋 What You Need Before Starting</h3>
                
                <div class="prereq-section">
                    <h4>✅ Access & Permissions</h4>
                    <ul class="checklist">
                        <li><input type="checkbox"> Administrator access to all servers you want to migrate</li>
                        <li><input type="checkbox"> Read access to network configuration files</li>
                        <li><input type="checkbox"> Access to billing/cost information</li>
                        <li><input type="checkbox"> Permission to install monitoring agents</li>
                    </ul>
                </div>

                <div class="prereq-section">
                    <h4>🛠️ Tools You'll Need</h4>
                    <ul class="checklist">
                        <li><input type="checkbox"> Spreadsheet software (Excel or Google Sheets)</li>
                        <li><input type="checkbox"> Drawing tool (Draw.io, Lucidchart, or even paper and pencil)</li>
                        <li><input type="checkbox"> SSH client (PuTTY for Windows, Terminal for Mac/Linux)</li>
                        <li><input type="checkbox"> Discovery tool from your cloud provider (we'll install this together)</li>
                    </ul>
                </div>

                <div class="prereq-section">
                    <h4>👥 People You'll Need</h4>
                    <ul class="checklist">
                        <li><input type="checkbox"> Application owners who know what each system does</li>
                        <li><input type="checkbox"> Network administrator who understands your network layout</li>
                        <li><input type="checkbox"> Someone from finance who can explain current costs</li>
                    </ul>
                </div>

                <div class="time-estimate">
                    <h4>⏰ Time Breakdown</h4>
                    <div class="time-grid">
                        <div class="time-item">
                            <span class="time-icon">📥</span>
                            <span class="time-label">Tool Installation</span>
                            <span class="time-value">2-4 hours</span>
                        </div>
                        <div class="time-item">
                            <span class="time-icon">👀</span>
                            <span class="time-label">Data Collection</span>
                            <span class="time-value">24-48 hours</span>
                        </div>
                        <div class="time-item">
                            <span class="time-icon">📊</span>
                            <span class="time-label">Analysis</span>
                            <span class="time-value">1-2 days</span>
                        </div>
                        <div class="time-item">
                            <span class="time-icon">📝</span>
                            <span class="time-label">Documentation</span>
                            <span class="time-value">4-8 hours</span>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        steps: `
            <div class="detailed-steps">
                <h3>🎯 Step-by-Step Implementation Guide</h3>
                
                <!-- PHASE 1 -->
                <div class="phase-card">
                    <div class="phase-header">
                        <span class="phase-number">Phase 1</span>
                        <h4>Installing Discovery Tools</h4>
                        <span class="phase-duration">⏱️ 2-4 hours</span>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">1.1</span>
                            <h5>Choose Your Discovery Tool</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Select the right tool based on where you're migrating to.</p>
                            
                            <div class="tool-selection-grid">
                                <div class="tool-card">
                                    <div class="tool-icon">☁️</div>
                                    <h6>AWS Application Discovery Service</h6>
                                    <p><strong>Use if migrating to:</strong> Amazon AWS</p>
                                    <p><strong>Download from:</strong> AWS Console → Migration Hub → Discovery</p>
                                    <button class="btn-small">📖 AWS Setup Guide</button>
                                </div>
                                <div class="tool-card">
                                    <div class="tool-icon">🌐</div>
                                    <h6>Azure Migrate</h6>
                                    <p><strong>Use if migrating to:</strong> Microsoft Azure</p>
                                    <p><strong>Download from:</strong> Azure Portal → Azure Migrate → Assessment</p>
                                    <button class="btn-small">📖 Azure Setup Guide</button>
                                </div>
                                <div class="tool-card">
                                    <div class="tool-icon">☁️</div>
                                    <h6>Google Cloud Migration Assessment</h6>
                                    <p><strong>Use if migrating to:</strong> Google Cloud</p>
                                    <p><strong>Download from:</strong> GCP Console → Migrate to Virtual Machines</p>
                                    <button class="btn-small">📖 GCP Setup Guide</button>
                                </div>
                            </div>

                            <div class="help-box">
                                <strong>💡 Pro Tip:</strong> Not sure which cloud to choose? AWS is great for flexibility, Azure integrates well with Microsoft products, and Google Cloud excels in data analytics. You can't go wrong with any of them!
                            </div>
                        </div>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">1.2</span>
                            <h5>Download the Discovery Agent</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Download the small program that will scan your servers.</p>
                            
                            <div class="instruction-flow">
                                <div class="instruction-item">
                                    <div class="instruction-number">1</div>
                                    <div class="instruction-text">
                                        <strong>Log into your cloud provider's console</strong>
                                        <p>Open your web browser and go to the cloud provider's website. Sign in with your account.</p>
                                    </div>
                                </div>
                                <div class="arrow-down">↓</div>
                                <div class="instruction-item">
                                    <div class="instruction-number">2</div>
                                    <div class="instruction-text">
                                        <strong>Navigate to Migration or Discovery section</strong>
                                        <p>Look for "Migration Hub" (AWS), "Azure Migrate" (Azure), or "Migrate to VMs" (GCP) in the main menu.</p>
                                    </div>
                                </div>
                                <div class="arrow-down">↓</div>
                                <div class="instruction-item">
                                    <div class="instruction-number">3</div>
                                    <div class="instruction-text">
                                        <strong>Click "Download Agent" or "Download Installer"</strong>
                                        <p>You'll see a big button that says "Download Discovery Agent" or similar. Click it!</p>
                                    </div>
                                </div>
                                <div class="arrow-down">↓</div>
                                <div class="instruction-item">
                                    <div class="instruction-number">4</div>
                                    <div class="instruction-text">
                                        <strong>Choose the right version</strong>
                                        <p>Select Windows or Linux based on what your servers run. When in doubt, check with your IT team.</p>
                                    </div>
                                </div>
                                <div class="arrow-down">↓</div>
                                <div class="instruction-item">
                                    <div class="instruction-number">5</div>
                                    <div class="instruction-text">
                                        <strong>Save the file</strong>
                                        <p>Save it somewhere you can easily find it, like your Desktop or Downloads folder.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="command-box">
                                <div class="command-header">
                                    <span>💻 Example: AWS Download Command</span>
                                    <button class="copy-btn" onclick="copyCode(this)">📋 Copy</button>
                                </div>
                                <pre><code># For Linux servers
wget https://s3.amazonaws.com/aws-discovery-agent/linux/latest/aws-discovery-agent.tar.gz

# For Windows servers - download from console (web interface)</code></pre>
                            </div>

                            <div class="warning-box">
                                <strong>⚠️ Important:</strong> The download might be a few hundred megabytes. Make sure you have enough space and a stable internet connection!
                            </div>
                        </div>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">1.3</span>
                            <h5>Install Agent on First Server</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Install the discovery tool on one server first to make sure it works.</p>
                            
                            <div class="os-tabs">
                                <button class="os-tab active" onclick="showOSTab('windows-install')">🪟 Windows</button>
                                <button class="os-tab" onclick="showOSTab('linux-install')">🐧 Linux</button>
                            </div>

                            <div id="windows-install" class="os-content active">
                                <h6>Windows Installation Steps:</h6>
                                <div class="instruction-flow">
                                    <div class="instruction-item">
                                        <div class="instruction-number">1</div>
                                        <div class="instruction-text">
                                            <strong>Connect to your server</strong>
                                            <p>Use Remote Desktop to connect to the Windows server.</p>
                                            <div class="help-text">Press Windows Key + R, type "mstsc", press Enter, then enter your server's IP address.</div>
                                        </div>
                                    </div>
                                    <div class="arrow-down">↓</div>
                                    <div class="instruction-item">
                                        <div class="instruction-number">2</div>
                                        <div class="instruction-text">
                                            <strong>Copy the installer to the server</strong>
                                            <p>You can drag and drop the file you downloaded, or copy it through Remote Desktop.</p>
                                        </div>
                                    </div>
                                    <div class="arrow-down">↓</div>
                                    <div class="instruction-item">
                                        <div class="instruction-number">3</div>
                                        <div class="instruction-text">
                                            <strong>Double-click the installer</strong>
                                            <p>Find the .exe file you downloaded and double-click it.</p>
                                        </div>
                                    </div>
                                    <div class="arrow-down">↓</div>
                                    <div class="instruction-item">
                                        <div class="instruction-number">4</div>
                                        <div class="instruction-text">
                                            <strong>Click "Next" through the wizard</strong>
                                            <p>Accept the defaults for most options. The installer knows what it's doing!</p>
                                        </div>
                                    </div>
                                    <div class="arrow-down">↓</div>
                                    <div class="instruction-item">
                                        <div class="instruction-number">5</div>
                                        <div class="instruction-text">
                                            <strong>Enter your cloud credentials when asked</strong>
                                            <p>You'll need your Access Key ID and Secret Access Key (or equivalent for Azure/GCP).</p>
                                        </div>
                                    </div>
                                    <div class="arrow-down">↓</div>
                                    <div class="instruction-item">
                                        <div class="instruction-number">6</div>
                                        <div class="instruction-text">
                                            <strong>Wait for "Installation Complete" message</strong>
                                            <p>This usually takes 2-5 minutes. The agent will start automatically!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div id="linux-install" class="os-content">
                                <h6>Linux Installation Steps:</h6>
                                <div class="command-box">
                                    <div class="command-header">
                                        <span>💻 Copy and paste these commands one at a time</span>
                                    </div>
                                    <pre><code># Step 1: Connect to your server
ssh username@your-server-ip

# Step 2: Download the agent (if not already done)
wget https://s3.amazonaws.com/aws-discovery-agent/linux/latest/aws-discovery-agent.tar.gz

# Step 3: Extract the files
tar -xzf aws-discovery-agent.tar.gz

# Step 4: Go into the extracted folder
cd aws-discovery-agent

# Step 5: Run the installer with sudo (admin privileges)
sudo bash install -r us-west-2 -k YOUR_ACCESS_KEY -s YOUR_SECRET_KEY

# Step 6: Verify it's running
sudo systemctl status aws-discovery-agent</code></pre>
                                </div>

                                <div class="success-indicator">
                                    <strong>✅ Success looks like this:</strong>
                                    <pre><code>● aws-discovery-agent.service - AWS Discovery Agent
   Loaded: loaded
   Active: active (running)</code></pre>
                                </div>
                            </div>

                            <div class="troubleshooting-box">
                                <h6>❓ Common Problems:</h6>
                                <details>
                                    <summary><strong>Problem:</strong> "Permission Denied" error</summary>
                                    <p><strong>Solution:</strong> You need administrator/root access. Try running with "sudo" on Linux or right-click "Run as Administrator" on Windows.</p>
                                </details>
                                <details>
                                    <summary><strong>Problem:</strong> "Invalid Credentials" error</summary>
                                    <p><strong>Solution:</strong> Double-check your Access Key and Secret Key. Make sure there are no extra spaces before or after them when you paste.</p>
                                </details>
                                <details>
                                    <summary><strong>Problem:</strong> Installation hangs or freezes</summary>
                                    <p><strong>Solution:</strong> Check your internet connection. The installer needs to download additional files. If it's still stuck after 10 minutes, press Ctrl+C to cancel and try again.</p>
                                </details>
                            </div>
                        </div>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">1.4</span>
                            <h5>Verify Agent is Working</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Make sure the agent is actually collecting data before installing on all servers.</p>
                            
                            <div class="verification-steps">
                                <h6>✅ Verification Checklist:</h6>
                                <ol>
                                    <li>
                                        <strong>Check the cloud console (wait 5-10 minutes after installation)</strong>
                                        <p>Go to Migration Hub → Discovery → Data Collectors</p>
                                        <p>You should see your server listed with a green "Active" status</p>
                                    </li>
                                    <li>
                                        <strong>Look for data collection</strong>
                                        <p>Click on the server name. You should start seeing some basic information like CPU, memory, and disk space.</p>
                                    </li>
                                    <li>
                                        <strong>Check agent logs on the server</strong>
                                        <div class="command-box">
                                            <pre><code># Windows: Check event viewer
eventvwr.msc → Application Logs → Look for "AWSDiscoveryAgent"

# Linux: Check logs
sudo tail -f /var/log/aws-discovery-agent/agent.log</code></pre>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                            <div class="success-indicator">
                                <strong>✅ What success looks like:</strong>
                                <ul>
                                    <li>Server shows "Active" or "Connected" in cloud console</li>
                                    <li>Data is appearing (even if just basic info at first)</li>
                                    <li>No error messages in logs</li>
                                    <li>You can see the server's hostname and IP address</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">1.5</span>
                            <h5>Install on All Remaining Servers</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Now that you know it works, install on all servers you want to migrate.</p>
                            
                            <div class="info-box">
                                <strong>💡 Smart Tip:</strong> Create a simple checklist with all your server names. Check them off as you install. This ensures you don't miss any!
                            </div>

                            <div class="spreadsheet-template">
                                <h6>📊 Use this tracking template:</h6>
                                <table class="tracking-table">
                                    <thead>
                                        <tr>
                                            <th>✅</th>
                                            <th>Server Name</th>
                                            <th>IP Address</th>
                                            <th>OS Type</th>
                                            <th>Installed?</th>
                                            <th>Status</th>
                                            <th>Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><input type="checkbox"></td>
                                            <td>WEB-SERVER-01</td>
                                            <td>192.168.1.10</td>
                                            <td>Windows</td>
                                            <td>Yes ✅</td>
                                            <td>Active</td>
                                            <td>Working perfectly</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox"></td>
                                            <td>DB-SERVER-01</td>
                                            <td>192.168.1.20</td>
                                            <td>Linux</td>
                                            <td>Yes ✅</td>
                                            <td>Active</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td><input type="checkbox"></td>
                                            <td>APP-SERVER-01</td>
                                            <td>192.168.1.30</td>
                                            <td>Windows</td>
                                            <td>Pending</td>
                                            <td>-</td>
                                            <td>Install tomorrow</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button class="btn-small">📥 Download Excel Template</button>
                            </div>

                            <div class="time-saving-tip">
                                <strong>⚡ Time-Saving Automation:</strong>
                                <p>If you have many servers (20+), consider using automation scripts. Most cloud providers offer bulk installation scripts. Ask your cloud provider's support team for help!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PHASE 2 -->
                <div class="phase-card">
                    <div class="phase-header">
                        <span class="phase-number">Phase 2</span>
                        <h4>Data Collection Period</h4>
                        <span class="phase-duration">⏱️ 24-48 hours</span>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">2.1</span>
                            <h5>Let Agents Collect Data</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Wait patiently while the agents watch your servers and learn their patterns.</p>
                            
                            <div class="info-box">
                                <strong>🧠 Why the wait?</strong> Your servers don't use the same amount of resources all day. Some are busy in the morning, others at night. The agents need to see at least one full day (ideally two) to understand the patterns. This helps right-size your cloud resources later!</div>

                            <div class="what-gets-collected">
                                <h6>📊 What's Being Collected:</h6>
                                <div class="collection-grid">
                                    <div class="collection-item">
                                        <div class="collection-icon">💻</div>
                                        <h6>Performance Metrics</h6>
                                        <ul>
                                            <li>CPU usage every minute</li>
                                            <li>Memory consumption</li>
                                            <li>Disk I/O operations</li>
                                            <li>Network traffic</li>
                                        </ul>
                                    </div>
                                    <div class="collection-item">
                                        <div class="collection-icon">🔗</div>
                                        <h6>Network Connections</h6>
                                        <ul>
                                            <li>Which servers talk to each other</li>
                                            <li>Which ports are being used</li>
                                            <li>How much data flows between servers</li>
                                            <li>External connections</li>
                                        </ul>
                                    </div>
                                    <div class="collection-item">
                                        <div class="collection-icon">📦</div>
                                        <h6>Software Inventory</h6>
                                        <ul>
                                            <li>Operating system details</li>
                                            <li>Installed applications</li>
                                            <li>Running services</li>
                                            <li>Open ports</li>
                                        </ul>
                                    </div>
                                    <div class="collection-item">
                                        <div class="collection-icon">💾</div>
                                        <h6>Storage Details</h6>
                                        <ul>
                                            <li>Total disk capacity</li>
                                            <li>Used vs free space</li>
                                            <li>File system types</li>
                                            <li>Storage performance</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div class="daily-checklist">
                                <h6>✅ Daily Monitoring Checklist:</h6>
                                <ul>
                                    <li><input type="checkbox"> Check cloud console once per day</li>
                                    <li><input type="checkbox"> Verify all agents still show "Active"</li>
                                    <li><input type="checkbox"> Look for any error notifications</li>
                                    <li><input type="checkbox"> Note if any servers went offline</li>
                                </ul>
                            </div>

                            <div class="warning-box">
                                <strong>⚠️ Don't skip this waiting period!</strong> Some people get impatient and start analyzing after just a few hours. Bad idea! You'll make wrong decisions based on incomplete data. Just like you wouldn't judge a restaurant by tasting one dish, don't judge your infrastructure by one hour of data.
                            </div>
                        </div>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">2.2</span>
                            <h5>Daily Progress Checks</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Check in daily to make sure everything is running smoothly.</p>
                            
                            <div class="daily-routine">
                                <h6>Your Daily 10-Minute Routine:</h6>
                                <div class="routine-steps">
                                    <div class="routine-item">
                                        <div class="routine-time">Day 1 - Morning</div>
                                        <div class="routine-task">
                                            <strong>Initial Check</strong>
                                            <ul>
                                                <li>Log into cloud console</li>
                                                <li>Verify all servers showing "Active"</li>
                                                <li>Take screenshot of dashboard for records</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="routine-item">
                                        <div class="routine-time">Day 1 - Evening</div>
                                        <div class="routine-task">
                                            <strong>Evening Check</strong>
                                            <ul>
                                                <li>Check for any offline servers</li>
                                                <li>Review any alert emails received</li>
                                                <li>Note: It's normal to see limited data yet</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="routine-item">
                                        <div class="routine-time">Day 2 - Morning</div>
                                        <div class="routine-task">
                                            <strong>Progress Review</strong>
                                            <ul>
                                                <li>Check data collection progress (should be 40-50%)</li>
                                                <li>Look at preliminary dependency map</li>
                                                <li>Fix any offline agents</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="routine-item">
                                        <div class="routine-time">Day 2 - Evening</div>
                                        <div class="routine-task">
                                            <strong>Ready for Analysis</strong>
                                            <ul>
                                                <li>Confirm all servers still active</li>
                                                <li>Data collection should be 80-90% complete</li>
                                                <li>Prepare for analysis tomorrow!</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- PHASE 3 -->
                <div class="phase-card">
                    <div class="phase-header">
                        <span class="phase-number">Phase 3</span>
                        <h4>Analysis & Documentation</h4>
                        <span class="phase-duration">⏱️ 1-2 days</span>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">3.1</span>
                            <h5>Generate Discovery Report</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Create a comprehensive report from all collected data.</p>
                            
                            <div class="instruction-flow">
                                <div class="instruction-item">
                                    <div class="instruction-number">1</div>
                                    <div class="instruction-text">
                                        <strong>Navigate to Reports Section</strong>
                                        <p>Cloud Console → Migration Hub → Reports (or Assessment Reports)</p>
                                    </div>
                                </div>
                                <div class="arrow-down">↓</div>
                                <div class="instruction-item">
                                    <div class="instruction-number">2</div>
                                    <div class="instruction-text">
                                        <strong>Click "Generate New Report"</strong>
                                        <p>Look for a button that says "Create Report" or "Generate Assessment"</p>
                                    </div>
                                </div>
                                <div class="arrow-down">↓</div>
                                <div class="instruction-item">
                                    <div class="instruction-number">3</div>
                                    <div class="instruction-text">
                                        <strong>Select Report Type: "Comprehensive Discovery Report"</strong>
                                        <p>Choose the option that includes all servers and all metrics</p>
                                    </div>
                                </div>
                                <div class="arrow-down">↓</div>
                                <div class="instruction-item">
                                    <div class="instruction-number">4</div>
                                    <div class="instruction-text">
                                        <strong>Choose Time Range: "Last 48 Hours"</strong>
                                        <p>This gives you the complete data collection period</p>
                                    </div>
                                </div>
                                <div class="arrow-down">↓</div>
                                <div class="instruction-item">
                                    <div class="instruction-number">5</div>
                                    <div class="instruction-text">
                                        <strong>Select Export Format: Excel or PDF</strong>
                                        <p>Excel is better for analysis, PDF is better for presentations</p>
                                        <button class="btn-small">💡 Download both!</button>
                                    </div>
                                </div>
                                <div class="arrow-down">↓</div>
                                <div class="instruction-item">
                                    <div class="instruction-number">6</div>
                                    <div class="instruction-text">
                                        <strong>Wait 5-10 minutes for report generation</strong>
                                        <p>Large environments might take longer. You'll get an email when ready.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="report-preview">
                                <h6>📋 Your Report Will Include:</h6>
                                <ul>
                                    <li>✅ Complete server inventory (Name, IP, OS, specs)</li>
                                    <li>✅ Performance statistics (CPU, memory, disk, network)</li>
                                    <li>✅ Application dependencies map</li>
                                    <li>✅ Storage utilization breakdown</li>
                                    <li>✅ Network traffic patterns</li>
                                    <li>✅ Cloud sizing recommendations</li>
                                    <li>✅ Estimated cloud costs</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">3.2</span>
                            <h5>Create Application Dependency Map</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Draw a picture showing how all your applications connect.</p>
                            
                            <div class="info-box">
                                <strong>🎨 Think of this like a family tree, but for servers!</strong> It shows which servers are "parents" (providing services) and which are "children" (using those services).
                            </div>

                            <div class="mapping-guide">
                                <h6>🗺️ Creating Your Map - Step by Step:</h6>
                                
                                <div class="mapping-method">
                                    <h6>Method 1: Using Cloud Provider's Tool (Easiest)</h6>
                                    <ol>
                                        <li>Go to Migration Hub → Network Diagram</li>
                                        <li>Click "Auto-Generate Map"</li>
                                        <li>The tool will create a visual diagram automatically</li>
                                        <li>Review and adjust manually if needed</li>
                                        <li>Export as PNG or PDF</li>
                                    </ol>
                                </div>

                                <div class="mapping-method">
                                    <h6>Method 2: Draw It Yourself (More Control)</h6>
                                    <p>Use draw.io, Lucidchart, or even PowerPoint:</p>
                                    <ol>
                                        <li>Create a box for each server</li>
                                        <li>Draw arrows showing connections (Server A → Server B)</li>
                                        <li>Label arrows with service types (e.g., "Database Queries", "File Transfers")</li>
                                        <li>Group related servers together</li>
                                        <li>Use colors: Blue = Web, Green = Database, Orange = Storage</li>
                                    </ol>
                                </div>
                            </div>

                            <div class="example-diagram">
                                <h6>📊 Example Dependency Map:</h6>
                                <div class="diagram-box">
                                    <pre>
                    [Internet]
                         |
                         ↓
                  [Load Balancer]
                    /    |    \\
                   /     |     \\
                  ↓      ↓      ↓
              [Web1] [Web2] [Web3]
                  \\     |     /
                   \\    |    /
                    ↓   ↓   ↓
                 [App Server]
                      |
                      ↓
                 [Database]
                      |
                      ↓
                 [File Storage]
                                    </pre>
                                </div>
                            </div>

                            <div class="critical-connections">
                                <h6>🔴 Mark These Critical Connections:</h6>
                                <ul>
                                    <li><strong>Database connections</strong> - These MUST work 24/7</li>
                                    <li><strong>Authentication services</strong> - Without these, nobody can log in</li>
                                    <li><strong>File storage</strong> - Applications need to read/write files</li>
                                    <li><strong>API endpoints</strong> - External systems calling your services</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">3.3</span>
                            <h5>Calculate Current Costs</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Figure out exactly how much your current setup costs.</p>
                            
                            <div class="cost-calculator">
                                <h6>💰 Total Cost of Ownership (TCO) Calculator:</h6>
                                
                                <div class="cost-category">
                                    <h6>1. Hardware Costs</h6>
                                    <table class="cost-table">
                                        <tr>
                                            <td>Server hardware (if owned)</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Server leases/rentals</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Network equipment</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Storage hardware</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                    </table>
                                </div>

                                <div class="cost-category">
                                    <h6>2. Facility Costs</h6>
                                    <table class="cost-table">
                                        <tr>
                                            <td>Datacenter rent/colocation</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Electricity</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Cooling/HVAC</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Physical security</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                    </table>
                                </div>

                                <div class="cost-category">
                                    <h6>3. Personnel Costs</h6>
                                    <table class="cost-table">
                                        <tr>
                                            <td>System administrators (% of time on these servers)</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Network administrators</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Security personnel</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                    </table>
                                </div>

                                <div class="cost-category">
                                    <h6>4. Software & Licensing</h6>
                                    <table class="cost-table">
                                        <tr>
                                            <td>Operating system licenses</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Application licenses</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Security software</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Backup software</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                    </table>
                                </div>

                                <div class="cost-category">
                                    <h6>5. Maintenance & Support</h6>
                                    <table class="cost-table">
                                        <tr>
                                            <td>Hardware maintenance contracts</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Software support contracts</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                        <tr>
                                            <td>Network connectivity (ISP)</td>
                                            <td><input type="number" placeholder="$"> / month</td>
                                        </tr>
                                    </table>
                                </div>

                                <div class="cost-total">
                                    <h6>💰 Total Monthly Cost: <span id="totalCost">$0</span></h6>
                                    <h6>💰 Annual Cost: <span id="annualCost">$0</span></h6>
                                    <button class="btn">📊 Calculate My Costs</button>
                                </div>
                            </div>

                            <div class="help-box">
                                <strong>💡 Don't know exact costs?</strong> Talk to your finance department. They'll have invoices and purchase orders. For personnel costs, estimate what percentage of their time is spent on these servers (e.g., if a sysadmin spends 50% of their time, use 50% of their salary).
                            </div>
                        </div>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">3.4</span>
                            <h5>Assess Migration Readiness</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Rate each application on how easy it will be to move to the cloud.</p>
                            
                            <div class="readiness-framework">
                                <h6>🎯 Migration Readiness Framework:</h6>
                                
                                <div class="readiness-level easy">
                                    <h6>🟢 Easy to Migrate (Wave 1)</h6>
                                    <p>Move these first to gain experience and build confidence.</p>
                                    <ul>
                                        <li>✅ Runs on standard OS (Windows Server 2016+, Linux)</li>
                                        <li>✅ No special hardware requirements</li>
                                        <li>✅ Stateless applications (can restart anytime)</li>
                                        <li>✅ Well documented</li>
                                        <li>✅ Test/Development environments</li>
                                        <li>✅ Applications with few dependencies</li>
                                    </ul>
                                    <p><strong>Examples:</strong> File servers, web servers, development databases, internal tools</p>
                                </div>

                                <div class="readiness-level medium">
                                    <h6>🟡 Medium Difficulty (Wave 2)</h6>
                                    <p>Move these after Wave 1 succeeds. Require more planning.</p>
                                    <ul>
                                        <li>⚠️ Production applications with regular downtime windows</li>
                                        <li>⚠️ Applications with some custom configurations</li>
                                        <li>⚠️ Databases that can tolerate brief downtime</li>
                                        <li>⚠️ Applications with moderate dependencies</li>
                                        <li>⚠️ Older but supported OS versions</li>
                                    </ul>
                                    <p><strong>Examples:</strong> Internal applications, departmental databases, batch processing systems</p>
                                </div>

                                <div class="readiness-level hard">
                                    <h6>🔴 Difficult to Migrate (Wave 3)</h6>
                                    <p>Move these last. Need significant planning and testing.</p>
                                    <ul>
                                        <li>❌ 24/7 critical applications (no downtime allowed)</li>
                                        <li>❌ Requires specific hardware (dongles, special cards)</li>
                                        <li>❌ Legacy applications (very old OS)</li>
                                        <li>❌ Tightly coupled with on-premise systems</li>
                                        <li>❌ Vendor software with cloud restrictions</li>
                                        <li>❌ Massive databases (terabytes of data)</li>
                                    </ul>
                                    <p><strong>Examples:</strong> Core banking systems, mainframes, ERP systems, high-frequency trading platforms</p>
                                </div>

                                <div class="readiness-level blocked">
                                    <h6>⛔ Cannot Migrate</h6>
                                    <p>Keep these on-premise. Do not attempt to migrate.</p>
                                    <ul>
                                        <li>🚫 Requires specific physical hardware not available in cloud</li>
                                        <li>🚫 Regulatory compliance requires on-premise (rare, but possible)</li>
                                        <li>🚫 Vendor contract prohibits cloud hosting</li>
                                        <li>🚫 Requires direct physical access to equipment</li>
                                    </ul>
                                    <p><strong>Examples:</strong> Industrial control systems, equipment with hardware dongles, certain government systems</p>
                                </div>
                            </div>

                            <div class="assessment-template">
                                <h6>📊 Application Assessment Template:</h6>
                                <table class="assessment-table">
                                    <thead>
                                        <tr>
                                            <th>Application</th>
                                            <th>Category</th>
                                            <th>Wave</th>
                                            <th>Estimated Effort</th>
                                            <th>Key Challenges</th>
                                            <th>Owner</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="easy-row">
                                            <td>Dev Database</td>
                                            <td>🟢 Easy</td>
                                            <td>Wave 1</td>
                                            <td>2 days</td>
                                            <td>None</td>
                                            <td>Dev Team</td>
                                        </tr>
                                        <tr class="medium-row">
                                            <td>CRM System</td>
                                            <td>🟡 Medium</td>
                                            <td>Wave 2</td>
                                            <td>1 week</td>
                                            <td>Need weekend window</td>
                                            <td>Sales Team</td>
                                        </tr>
                                        <tr class="hard-row">
                                            <td>Payment System</td>
                                            <td>🔴 Difficult</td>
                                            <td>Wave 3</td>
                                            <td>2 months</td>
                                            <td>Zero downtime, PCI compliance</td>
                                            <td>Finance Team</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <button class="btn-small">📥 Download Template</button>
                            </div>
                        </div>
                    </div>

                    <div class="substep">
                        <div class="substep-header">
                            <span class="substep-number">3.5</span>
                            <h5>Create Master Documentation Package</h5>
                        </div>
                        <div class="substep-content">
                            <p><strong>What to do:</strong> Compile everything into one organized folder.</p>
                            
                            <div class="documentation-structure">
                                <h6>📁 Your Documentation Folder Structure:</h6>
                                <pre class="folder-tree">
📁 Cloud Migration - Discovery & Assessment
   │
   ├── 📄 Executive Summary.pdf
   │   └── 1-page overview for leadership
   │
   ├── 📁 01_Inventory
   │   ├── Server_Inventory.xlsx
   │   ├── Application_List.xlsx
   │   └── Network_Diagram.png
   │
   ├── 📁 02_Performance_Data
   │   ├── Discovery_Report.xlsx
   │   ├── CPU_Utilization_Charts.pdf
   │   ├── Memory_Trends.pdf
   │   └── Network_Traffic_Analysis.pdf
   │
   ├── 📁 03_Dependencies
   │   ├── Application_Dependency_Map.png
   │   ├── Database_Connections.xlsx
   │   └── API_Integrations.xlsx
   │
   ├── 📁 04_Cost_Analysis
   │   ├── Current_TCO_Breakdown.xlsx
   │   ├── Cloud_Cost_Estimates.xlsx
   │   └── Cost_Comparison.pdf
   │
   ├── 📁 05_Migration_Readiness
   │   ├── Application_Assessment.xlsx
   │   ├── Wave_Planning.xlsx
   │   └── Risk_Analysis.xlsx
   │
   └── 📁 06_Raw_Data
       ├── Agent_Logs/
       ├── Original_Reports/
       └── Screenshots/
                                </pre>
                            </div>

                            <div class="executive-summary-template">
                                <h6>📄 Executive Summary Template:</h6>
                                <div class="template-box">
                                    <h6>Cloud Migration Discovery - Executive Summary</h6>
                                    <p><strong>Date:</strong> [Today's Date]</p>
                                    <p><strong>Prepared by:</strong> [Your Name]</p>
                                    
                                    <p><strong>Key Findings:</strong></p>
                                    <ul>
                                        <li>Total Servers: [X] servers analyzed</li>
                                        <li>Total Applications: [Y] applications identified</li>
                                        <li>Current Monthly Cost: $[Amount]</li>
                                        <li>Estimated Cloud Cost: $[Amount]</li>
                                        <li>Potential Savings: $[Amount] ([%])</li>
                                    </ul>

                                    <p><strong>Migration Complexity Breakdown:</strong></p>
                                    <ul>
                                        <li>🟢 Easy (Wave 1): [X] applications</li>
                                        <li>🟡 Medium (Wave 2): [Y] applications</li>
                                        <li>🔴 Difficult (Wave 3): [Z] applications</li>
                                    </ul>

                                    <p><strong>Recommended Timeline:</strong></p>
                                    <ul>
                                        <li>Wave 1: [Months]</li>
                                        <li>Wave 2: [Months]</li>
                                        <li>Wave 3: [Months]</li>
                                        <li>Total: [Months]</li>
                                    </ul>

                                    <p><strong>Next Steps:</strong></p>
                                    <ol>
                                        <li>Present findings to leadership (Week 1)</li>
                                        <li>Get budget approval (Week 2-3)</li>
                                        <li>Begin Prerequisites Phase (Week 4)</li>
                                    </ol>
                                </div>
                                <button class="btn-small">📥 Download Word Template</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        validation: `
            <div class="validation-section">
                <h3>✅ Validation & Success Criteria</h3>
                
                <div class="validation-checklist">
                    <h4>Before Moving to Next Step, Verify:</h4>
                    
                    <div class="validation-category">
                        <h5>🎯 Data Collection Complete</h5>
                        <ul class="checklist">
                            <li><input type="checkbox"> All agents show "Active" status for at least 48 hours</li>
                            <li><input type="checkbox"> No servers missing from discovery report</li>
                            <li><input type="checkbox"> Performance data collected for peak and off-peak hours</li>
                            <li><input type="checkbox"> Network connection data captured</li>
                        </ul>
                    </div>

                    <div class="validation-category">
                        <h5>📊 Documentation Complete</h5>
                        <ul class="checklist">
                            <li><input type="checkbox"> Server inventory spreadsheet completed</li>
                            <li><input type="checkbox"> Application dependency map created</li>
                            <li><input type="checkbox"> Current cost analysis documented</li>
                            <li><input type="checkbox"> Migration readiness assessment finished</li>
                            <li><input type="checkbox"> Executive summary prepared</li>
                        </ul>
                    </div>

                    <div class="validation-category">
                        <h5>👥 Stakeholder Alignment</h5>
                        <ul class="checklist">
                            <li><input type="checkbox"> Application owners interviewed</li>
                            <li><input type="checkbox"> Network team consulted</li>
                            <li><input type="checkbox"> Finance provided cost data</li>
                            <li><input type="checkbox"> Leadership briefed on findings</li>
                        </ul>
                    </div>

                    <div class="validation-category">
                        <h5>🎓 Knowledge Transfer</h5>
                        <ul class="checklist">
                            <li><input type="checkbox"> All documentation stored in shared location</li>
                            <li><input type="checkbox"> Team members trained on findings</li>
                            <li><input type="checkbox"> Questions answered and documented</li>
                        </ul>
                    </div>
                </div>

                <div class="success-metrics">
                    <h4>📈 Success Metrics</h4>
                    <div class="metrics-grid">
                        <div class="metric-card">
                            <div class="metric-icon">✅</div>
                            <div class="metric-label">Completeness</div>
                            <div class="metric-value">100%</div>
                            <div class="metric-desc">All servers discovered</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">🎯</div>
                            <div class="metric-label">Accuracy</div>
                            <div class="metric-value">95%+</div>
                            <div class="metric-desc">Data verified by owners</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">📋</div>
                            <div class="metric-label">Documentation</div>
                            <div class="metric-value">Complete</div>
                            <div class="metric-desc">All templates filled</div>
                        </div>
                        <div class="metric-card">
                            <div class="metric-icon">👍</div>
                            <div class="metric-label">Stakeholder Buy-in</div>
                            <div class="metric-value">Achieved</div>
                            <div class="metric-desc">Leadership approved</div>
                        </div>
                    </div>
                </div>

                <div class="validation-test">
                    <h4>🧪 Final Validation Test</h4>
                    <p>Answer these questions. If you can answer "Yes" to all, you're ready for the next step:</p>
                    <ol>
                        <li>
                            <strong>Can you name all servers and what they do?</strong>
                            <div class="test-input">
                                <label><input type="radio" name="q1" value="yes"> Yes, I have a complete list</label>
                                <label><input type="radio" name="q1" value="no"> No, some are unclear</label>
                            </div>
                        </li>
                        <li>
                            <strong>Do you know which applications depend on each other?</strong>
                            <div class="test-input">
                                <label><input type="radio" name="q2" value="yes"> Yes, I have a dependency map</label>
                                <label><input type="radio" name="q2" value="no"> No, need more investigation</label>
                            </div>
                        </li>
                        <li>
                            <strong>Can you explain current costs to someone who knows nothing about IT?</strong>
                            <div class="test-input">
                                <label><input type="radio" name="q3" value="yes"> Yes, I have clear numbers</label>
                                <label><input type="radio" name="q3" value="no"> No, costs are unclear</label>
                            </div>
                        </li>
                        <li>
                            <strong>Have you identified which applications to migrate first?</strong>
                            <div class="test-input">
                                <label><input type="radio" name="q4" value="yes"> Yes, I have a wave plan</label>
                                <label><input type="radio" name="q4" value="no"> No, all seem equal</label>
                            </div>
                        </li>
                        <li>
                            <strong>Is all your documentation organized and accessible?</strong>
                            <div class="test-input">
                                <label><input type="radio" name="q5" value="yes"> Yes, everything is documented</label>
                                <label><input type="radio" name="q5" value="no"> No, it's scattered</label>
                            </div>
                        </li>
                    </ol>
                    <button class="btn">📊 Check My Readiness</button>
                </div>
            </div>
        `,
        
        troubleshooting: `
            <div class="troubleshooting-section">
                <h3>🔧 Troubleshooting Guide</h3>
                
                <div class="trouble-accordion">
                    <details class="trouble-item">
                        <summary><strong>❌ Problem:</strong> Discovery agent won't install</summary>
                        <div class="trouble-solution">
                            <p><strong>Possible Causes & Solutions:</strong></p>
                            <ol>
                                <li>
                                    <strong>Insufficient permissions</strong>
                                    <ul>
                                        <li>Windows: Right-click installer → "Run as Administrator"</li>
                                        <li>Linux: Use "sudo" before the install command</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Firewall blocking</strong>
                                    <ul>
                                        <li>Check Windows Firewall or iptables</li>
                                        <li>Agent needs outbound HTTPS (port 443) access</li>
                                        <li>Add exception for cloud provider domains</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Antivirus interference</strong>
                                    <ul>
                                        <li>Temporarily disable antivirus during install</li>
                                        <li>Add agent to antivirus whitelist</li>
                                        <li>Re-enable antivirus after installation</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </details>

                    <details class="trouble-item">
                        <summary><strong>❌ Problem:</strong> Agent installed but showing "Offline"</summary>
                        <div class="trouble-solution">
                            <p><strong>Diagnostic Steps:</strong></p>
                            <ol>
                                <li>
                                    <strong>Check agent service status</strong>
                                    <div class="command-box">
                                        <pre><code># Windows
services.msc → Find "AWS Discovery Agent" → Should say "Running"

# Linux
sudo systemctl status aws-discovery-agent</code></pre>
                                    </div>
                                </li>
                                <li>
                                    <strong>Verify internet connectivity</strong>
                                    <div class="command-box">
                                        <pre><code># Test connection to AWS
ping discovery.us-west-2.amazonaws.com

# Or for Azure
ping azure.microsoft.com</code></pre>
                                    </div>
                                </li>
                                <li>
                                    <strong>Check credentials</strong>
                                    <ul>
                                        <li>Verify Access Key and Secret Key are correct</li>
                                        <li>Ensure IAM user has proper permissions</li>
                                        <li>Try regenerating credentials if unsure</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Review agent logs</strong>
                                    <div class="command-box">
                                        <pre><code># Windows
C:\\ProgramData\\AWS\\Discovery\\Logs\\agent.log

# Linux
/var/log/aws-discovery-agent/agent.log</code></pre>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </details>

                    <details class="trouble-item">
                        <summary><strong>❌ Problem:</strong> No data appearing after 24 hours</summary>
                        <div class="trouble-solution">
                            <p><strong>Investigation Steps:</strong></p>
                            <ol>
                                <li>Confirm agent shows "Active" in cloud console</li>
                                <li>Check if data collection is actually enabled (sometimes needs manual start)</li>
                                <li>Verify clock synchronization on server (wrong time causes issues)</li>
                                <li>Look for error messages in agent logs</li>
                                <li>Try stopping and restarting the agent service</li>
                                <li>If still not working, uninstall and reinstall agent</li>
                            </ol>
                        </div>
                    </details>

                    <details class="trouble-item">
                        <summary><strong>❌ Problem:</strong> Missing dependencies in network map</summary>
                        <div class="trouble-solution">
                            <p><strong>Why This Happens:</strong></p>
                            <ul>
                                <li>Some connections only happen periodically (daily batch jobs, etc.)</li>
                                <li>Encrypted traffic might not show all details</li>
                                <li>Very short-lived connections might be missed</li>
                            </ul>
                            <p><strong>Solutions:</strong></p>
                            <ol>
                                <li>Extend data collection period to 7 days for complete picture</li>
                                <li>Manually trigger periodic jobs during collection period</li>
                                <li>Interview application owners to fill gaps</li>
                                <li>Review application configuration files for connection strings</li>
                                <li>Check database connection logs</li>
                            </ol>
                        </div>
                    </details>

                    <details class="trouble-item">
                        <summary><strong>❌ Problem:</strong> Cost estimates seem wrong</summary>
                        <div class="trouble-solution">
                            <p><strong>Common Causes of Incorrect Estimates:</strong></p>
                            <ol>
                                <li>
                                    <strong>Peak usage not captured</strong>
                                    <ul>
                                        <li>Collection period didn't include monthly peak (like end-of-month processing)</li>
                                        <li>Solution: Run collection during historically busy period</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Storage costs underestimated</strong>
                                    <ul>
                                        <li>Backup storage not included in estimates</li>
                                        <li>Solution: Add backup storage + snapshot costs manually</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Data transfer costs overlooked</strong>
                                    <ul>
                                        <li>Tool might not account for outbound data transfer</li>
                                        <li>Solution: Review network logs and add transfer costs</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Wrong region selected</strong>
                                    <ul>
                                        <li>Costs vary significantly by cloud region</li>
                                        <li>Solution: Recalculate using correct target region</li>
                                    </ul>
                                </li>
                            </ol>
                            <div class="help-box">
                                <strong>💡 Pro Tip:</strong> Add 20-30% buffer to estimates for licenses, support, and unexpected costs.
                            </div>
                        </div>
                    </details>

                    <details class="trouble-item">
                        <summary><strong>❌ Problem:</strong> Stakeholders don't understand the findings</summary>
                        <div class="trouble-solution">
                            <p><strong>Communication Strategies:</strong></p>
                            <ol>
                                <li>
                                    <strong>Use analogies they understand</strong>
                                    <ul>
                                        <li>"Like moving from owning to renting an apartment"</li>
                                        <li>"Similar to switching from buying cars to using Uber"</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Focus on business benefits, not technical details</strong>
                                    <ul>
                                        <li>Talk about cost savings, not CPU metrics</li>
                                        <li>Emphasize faster deployment, not VM specifications</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Use visual aids</strong>
                                    <ul>
                                        <li>Simple before/after diagrams</li>
                                        <li>Cost comparison charts</li>
                                        <li>Timeline infographics</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Prepare FAQ document</strong>
                                    <ul>
                                        <li>What changes for end users? (Usually nothing!)</li>
                                        <li>How long will this take?</li>
                                        <li>What if something goes wrong?</li>
                                        <li>Can we go back to on-premise? (Yes, but expensive)</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </details>

                    <details class="trouble-item">
                        <summary><strong>❌ Problem:</strong> Too much data to analyze</summary>
                        <div class="trouble-solution">
                            <p><strong>Data Management Strategies:</strong></p>
                            <ol>
                                <li>
                                    <strong>Prioritize critical systems first</strong>
                                    <ul>
                                        <li>Start with top 10 most important applications</li>
                                        <li>Perfect is the enemy of done - don't analyze everything to death</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Use cloud provider's automated tools</strong>
                                    <ul>
                                        <li>Let AI do the heavy lifting</li>
                                        <li>Focus human effort on reviewing recommendations</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Group similar servers together</strong>
                                    <ul>
                                        <li>Analyze one web server thoroughly</li>
                                        <li>Apply same approach to all other web servers</li>
                                    </ul>
                                </li>
                                <li>
                                    <strong>Set time limits</strong>
                                    <ul>
                                        <li>Spend max 2 hours per application on analysis</li>
                                        <li>If taking longer, it's too complex - mark for Wave 3</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>
                    </details>
                </div>

                <div class="support-resources">
                    <h4>🆘 Need More Help?</h4>
                    <div class="support-grid">
                        <div class="support-card">
                            <div class="support-icon">📚</div>
                            <h5>Documentation</h5>
                            <ul>
                                <li><a href="#">AWS Migration Hub User Guide</a></li>
                                <li><a href="#">Azure Migrate Documentation</a></li>
                                <li><a href="#">GCP Migration Center</a></li>
                            </ul>
                        </div>
                        <div class="support-card">
                            <div class="support-icon">💬</div>
                            <h5>Community Forums</h5>
                            <ul>
                                <li><a href="#">AWS Forums - Migration</a></li>
                                <li><a href="#">Azure Community</a></li>
                                <li><a href="#">Google Cloud Community</a></li>
                            </ul>
                        </div>
                        <div class="support-card">
                            <div class="support-icon">🎓</div>
                            <h5>Training Resources</h5>
                            <ul>
                                <li><a href="#">Free Migration Training</a></li>
                                <li><a href="#">Video Tutorials</a></li>
                                <li><a href="#">Certification Paths</a></li>
                            </ul>
                        </div>
                        <div class="support-card">
                            <div class="support-icon">🤝</div>
                            <h5>Professional Support</h5>
                            <ul>
                                <li><a href="#">AWS Support Plans</a></li>
                                <li><a href="#">Microsoft FastTrack</a></li>
                                <li><a href="#">GCP Support Options</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `,
        
        bestPractices: `
            <div class="best-practices-section">
                <h3>⭐ Best Practices & Pro Tips</h3>
                
                <div class="practice-category">
                    <h4>🎯 Before You Start</h4>
                    <ul>
                        <li>
                            <strong>Get executive buy-in first</strong>
                            <p>Don't start discovery until you have budget approval in principle. Waste of time otherwise.</p>
                        </li>
                        <li>
                            <strong>Identify a champion</strong>
                            <p>Find someone senior who believes in cloud migration. They'll help overcome political obstacles.</p>
                        </li>
                        <li>
                            <strong>Set realistic expectations</strong>
                            <p>Migration takes 3-12 months minimum. Don't promise faster timeline to impress leadership.</p>
                        </li>
                        <li>
                            <strong>Start small</strong>
                            <p>Pilot with 5-10 non-critical servers first. Learn from mistakes before touching production.</p>
                        </li>
                    </ul>
                </div>

                <div class="practice-category">
                    <h4>📊 During Discovery</h4>
                    <ul>
                        <li>
                            <strong>Collect for at least one full week</strong>
                            <p>Weekday patterns differ from weekends. Monthly patterns differ from daily. Capture it all.</p>
                        </li>
                        <li>
                            <strong>Interview application owners personally</strong>
                            <p>Tools miss context. Humans know "Server A must restart before Server B." Write this down!</p>
                        </li>
                        <li>
                            <strong>Document everything in real-time</strong>
                            <p>Don't rely on memory. Take screenshots. Record conversations (with permission). Write notes.</p>
                        </li>
                        <li>
                            <strong>Identify "hidden" dependencies early</strong>
                            <p>Look for: shared drives, DNS dependencies, time servers, license servers, print servers.</p>
                        </li>
                        <li>
                            <strong>Test discovery tools in non-production first</strong>
                            <p>Install on dev/test servers first. Make sure they won't impact performance.</p>
                        </li>
                    </ul>
                </div>

                <div class="practice-category">
                    <h4>💰 Cost Analysis</h4>
                    <ul>
                        <li>
                            <strong>Include ALL costs in TCO</strong>
                            <p>People forget: software licenses, personnel, facilities, network, backup, DR, power, cooling.</p>
                        </li>
                        <li>
                            <strong>Don't just compare monthly costs</strong>
                            <p>Look at 3-year total. Cloud costs drop over time with optimization. On-prem costs increase.</p>
                        </li>
                        <li>
                            <strong>Add 30% buffer to cloud estimates</strong>
                            <p>You'll forget something. Data transfer, backup, support, licenses. Better to overestimate.</p>
                        </li>
                        <li>
                            <strong>Calculate break-even point</strong>
                            <p>Migration costs money upfront. When do savings overtake migration costs? Year 1? Year 2?</p>
                        </li>
                    </ul>
                </div>

                <div class="practice-category">
                    <h4>👥 Team & Communication</h4>
                    <ul>
                        <li>
                            <strong>Create a RACI matrix</strong>
                            <p>Who is Responsible, Accountable, Consulted, Informed for each application? No ambiguity!</p>
                        </li>
                        <li>
                            <strong>Over-communicate progress</strong>
                            <p>Weekly status emails. Monthly town halls. Slack/Teams updates. Keep everyone informed.</p>
                        </li>
                        <li>
                            <strong>Celebrate small wins</strong>
                            <p>First server migrated? Celebrate! First application live? Pizza party! Keeps morale high.</p>
                        </li>
                        <li>
                            <strong>Be honest about challenges</strong>
                            <p>Don't hide problems. Escalate early. "Surprise" failures destroy trust and credibility.</p>
                        </li>
                    </ul>
                </div>

                <div class="practice-category">
                    <h4>🎓 Knowledge Management</h4>
                    <ul>
                        <li>
                            <strong>Create a migration wiki</strong>
                            <p>Confluence, SharePoint, even Google Docs. Central place for all knowledge.</p>
                        </li>
                        <li>
                            <strong>Record lessons learned weekly</strong>
                            <p>What worked? What didn't? What would you do differently? Write it down immediately.</p>
                        </li>
                        <li>
                            <strong>Build runbooks for repeated tasks</strong>
                            <p>Migrating your 10th web server? You should have a detailed checklist by now.</p>
                        </li>
                        <li>
                            <strong>Cross-train team members</strong>
                            <p>Bus factor = 1 is dangerous. What if key person leaves? Train backups for everything.</p>
                        </li>
                    </ul>
                </div>

                <div class="practice-category">
                    <h4>⚡ Speed vs Quality Balance</h4>
                    <ul>
                        <li>
                            <strong>Fast migrations usually cost more later</strong>
                            <p>Lift-and-shift is quick but expensive. Spend time optimizing or pay more forever.</p>
                        </li>
                        <li>
                            <strong>But don't get stuck in analysis paralysis</strong>
                            <p>90% confidence is enough. You'll learn more by doing than by planning.</p>
                        </li>
                        <li>
                            <strong>Use the 80/20 rule</strong>
                            <p>80% of your systems follow patterns. Perfect the approach for 20%, template the rest.</p>
                        </li>
                        <li>
                            <strong>Timebox decisions</strong>
                            <p>Can't decide between options? Set 1-hour limit. Make decision with available info.</p>
                        </li>
                    </ul>
                </div>

                <div class="practice-category">
                    <h4>🛡️ Risk Management</h4>
                    <ul>
                        <li>
                            <strong>Always have a rollback plan</strong>
                            <p>Can you revert if things go wrong? How long does it take? Test it!</p>
                        </li>
                        <li>
                            <strong>Keep old environment running</strong>
                            <p>Don't decommission source until 30 days after migration. Insurance policy.</p>
                        </li>
                        <li>
                            <strong>Backup before touching anything</strong>
                            <p>Full backup before migration. Keep for 90 days. Sleep better at night.</p>
                        </li>
                        <li>
                            <strong>Run parallel for critical systems</strong>
                            <p>Old and new running simultaneously. Verify results match. Switch traffic gradually.</p>
                        </li>
                    </ul>
                </div>

                <div class="practice-category">
                    <h4>🎯 Success Factors</h4>
                    <div class="success-factors">
                        <div class="factor-card green">
                            <h5>✅ What Makes Migrations Succeed</h5>
                            <ul>
                                <li>Strong executive sponsorship</li>
                                <li>Dedicated team (not "when you have time")</li>
                                <li>Realistic timelines</li>
                                <li>Good communication</li>
                                <li>Learning from failures</li>
                                <li>Celebrating progress</li>
                                <li>Proper training</li>
                                <li>Adequate budget</li>
                            </ul>
                        </div>
                        <div class="factor-card red">
                            <h5>❌ What Kills Migrations</h5>
                            <ul>
                                <li>Unrealistic deadlines</li>
                                <li>Part-time team members</li>
                                <li>No executive support</li>
                                <li>Poor documentation</li>
                                <li>Skipping discovery</li>
                                <li>Ignoring dependencies</li>
                                <li>No rollback plan</li>
                                <li>Surprise costs</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="golden-rules">
                    <h4>🏆 The Golden Rules (Never Break These)</h4>
                    <ol class="golden-list">
                        <li>
                            <strong>Never migrate during business-critical periods</strong>
                            <p>No migrations during tax season (finance), holiday season (retail), enrollment (education).</p>
                        </li>
                        <li>
                            <strong>Never change two things at once</strong>
                            <p>Don't migrate AND upgrade. Don't move AND refactor. One change at a time!</p>
                        </li>
                        <li>
                            <strong>Never skip testing</strong>
                            <p>"We'll test in production" = recipe for disaster. Always test. Always.</p>
                        </li>
                        <li>
                            <strong>Never surprise stakeholders</strong>
                            <p>Bad news should never be a surprise. Communicate early, communicate often.</p>
                        </li>
                        <li>
                            <strong>Never delete the source until verified</strong>
                            <p>Keep original for at least 30 days after migration. Trust, but verify.</p>
                        </li>
                    </ol>
                </div>

                <div class="expert-wisdom">
                    <h4>🧙 Wisdom from Migration Veterans</h4>
                    <div class="wisdom-quotes">
                        <blockquote>
                            <p>"The first migration always takes 3x longer than you think. The second one takes 2x. By the tenth, you'll be fast."</p>
                            <cite>— Senior Cloud Architect, Fortune 500</cite>
                        </blockquote>
                        <blockquote>
                            <p>"Discovery isn't about perfection. It's about reducing surprises. You'll never know everything."</p>
                            <cite>— CTO, SaaS Company</cite>
                        </blockquote>
                        <blockquote>
                            <p>"The best migration plan is the one that's actually followed, not the perfect one gathering dust."</p>
                            <cite>— Migration Consultant, 50+ projects</cite>
                        </blockquote>
                        <blockquote>
                            <p>"Budget 40% of your timeline for discovery and planning. Skimp here, pay triple later."</p>
                            <cite>— VP Infrastructure, Healthcare</cite>
                        </blockquote>
                    </div>
                </div>

                <div class="remember-box">
                    <h4>💡 Remember This Above All:</h4>
                    <p class="remember-text">
                        Cloud migration is a journey, not a destination. You'll make mistakes. That's okay. Learn from them. 
                        The goal isn't a perfect migration - the goal is a migration that improves your business. 
                        Focus on value delivered, not technical perfection.
                    </p>
                    <p class="remember-text">
                        <strong>Most importantly:</strong> You're not alone. Millions of companies have done this before. 
                        The path is well-worn. Follow proven practices, learn from others' mistakes, and you'll succeed.
                    </p>
                </div>
            </div>
        `
    },
    
    // Placeholder for remaining steps - will be filled with same level of detail
    2: {
        title: "Prerequisites & Setup",
        duration: "1-2 Weeks",
        difficulty: "Beginner",
        icon: "📚",
        overview: "Comprehensive guide coming soon...",
        prerequisites: "Prerequisites being documented...",
        steps: "Detailed steps being created...",
        validation: "Validation checklist in development...",
        troubleshooting: "Troubleshooting guide being compiled...",
        bestPractices: "Best practices being documented..."
    },
    
    3: {
        title: "Network Connectivity",
        duration: "1-2 Weeks",
        difficulty: "Intermediate",
        icon: "🌐",
        overview: "Comprehensive guide coming soon...",
        prerequisites: "Prerequisites being documented...",
        steps: "Detailed steps being created...",
        validation: "Validation checklist in development...",
        troubleshooting: "Troubleshooting guide being compiled...",
        bestPractices: "Best practices being documented..."
    }
};

// Steps 4-15 will follow the same ultra-detailed format
for (let i = 4; i <= 15; i++) {
    migrationGuides[i] = {
        title: getMigrationStepName(i),
        duration: "TBD",
        difficulty: "TBD",
        icon: getStepIcon(i),
        overview: `<p>Ultra-detailed guide for ${getMigrationStepName(i)} coming soon with same level of detail as Step 1...</p>`,
        prerequisites: "<p>Prerequisites being documented...</p>",
        steps: "<p>Step-by-step guide being created...</p>",
        validation: "<p>Validation checklist in development...</p>",
        troubleshooting: "<p>Troubleshooting guide being compiled...</p>",
        bestPractices: "<p>Best practices being documented...</p>"
    };
}

function getMigrationStepName(stepNum) {
    const steps = {
        1: 'Discovery & Assessment',
        2: 'Prerequisites & Setup',
        3: 'Network Connectivity',
        4: 'Data Migration Planning',
        5: 'Compute Migration',
        6: 'Database Migration',
        7: 'Storage Migration',
        8: 'Application Migration',
        9: 'Load Balancer Setup',
        10: 'DNS Configuration & Cutover',
        11: 'Testing & Validation',
        12: 'Monitoring & Observability',
        13: 'Backup & Disaster Recovery',
        14: 'Production Cutover',
        15: 'Post-Migration Optimization'
    };
    return steps[stepNum] || 'Migration Step';
}

function getStepIcon(stepNum) {
    const icons = {
        1: '🔍', 2: '📚', 3: '🌐', 4: '📦', 5: '🖥️',
        6: '🗄️', 7: '💾', 8: '🚀', 9: '⚖️', 10: '🌍',
        11: '✅', 12: '📊', 13: '🛡️', 14: '🎯', 15: '⚡'
    };
    return icons[stepNum] || '📋';
}