// Detailed step guides integrated with main platform
// This file provides the getStepDetail function referenced in index.html

function getStepDetail(stepNum, sourceEnv, destEnv) {
    const stepDetails = {
        1: {
            overview: `<div class="alert-box alert-info"><strong>What is Discovery:</strong> Discovery is like making a complete inventory before moving. You need to know exactly what you have.</div><p>You will install tools that scan servers automatically and create detailed reports.</p>`,
            howto: `<div class="instruction-section"><ul class="instruction-list"><li><strong>Choose your tool:</strong><br>For AWS use Application Discovery Service. For Azure use Azure Migrate. For Google Cloud use Migrate Assessment tool. Download the agent installer from your cloud provider.</li><li><strong>Install on each server:</strong><br>Log into server, run installer, agent starts automatically. Repeat for all servers you want to migrate.</li><li><strong>Wait 24-48 hours:</strong><br>Let agents collect data during normal operations. Check cloud console daily to see collected information.</li></ul></div>`,
            validation: `<div class="task-item"><div class="task-header"><div class="task-checkbox" onclick="toggleTask(this)"></div><div class="task-title">I know exact number of servers to migrate</div></div></div><div class="task-item"><div class="task-header"><div class="task-checkbox" onclick="toggleTask(this)"></div><div class="task-title">I have detailed inventory with specs</div></div></div>`
        },
        2: {
            overview: `<div class="alert-box alert-info"><strong>Prerequisites:</strong> Setting up everything you need before migration starts. Like gathering tools before a project.</div><p>Create cloud account, set up users, install CLI tools, configure security basics.</p>`,
            howto: `<div class="instruction-section"><ul class="instruction-list"><li><strong>Create cloud account:</strong><br>Visit provider website, click Sign Up, enter company info, add payment method, wait for activation.</li><li><strong>Set up users:</strong><br>Create admin account with strong password and 2FA. Create separate accounts for team members with appropriate permissions.</li><li><strong>Install CLI tools:</strong><br>Download installer, install on your computer, configure with access keys, test connection.</li></ul></div>`,
            validation: `<div class="task-item"><div class="task-header"><div class="task-checkbox" onclick="toggleTask(this)"></div><div class="task-title">Cloud account active with billing configured</div></div></div><div class="task-item"><div class="task-header"><div class="task-checkbox" onclick="toggleTask(this)"></div><div class="task-title">CLI tools installed and working</div></div></div>`
        },
        3: {
            overview: `<div class="alert-box alert-info"><strong>Network Connectivity:</strong> Building secure tunnel between office and cloud. Like creating a private highway for your data.</div><p>Set up VPN or Direct Connect for secure communication during migration.</p>`,
            howto: `<div class="instruction-section"><ul class="instruction-list"><li><strong>Find office IP:</strong><br>Go to whatismyip.com from office network. Write down the public IP address shown.</li><li><strong>Create VPN gateway:</strong><br>In cloud console, create Virtual Private Gateway. Enter office IP, download config file.</li><li><strong>Configure router:</strong><br>Backup router config first. Import downloaded file into router VPN settings. Apply and wait for connection.</li></ul></div>`,
            validation: `<div class="task-item"><div class="task-header"><div class="task-checkbox" onclick="toggleTask(this)"></div><div class="task-title">VPN shows connected in both locations</div></div></div><div class="task-item"><div class="task-header"><div class="task-checkbox" onclick="toggleTask(this)"></div><div class="task-title">Can ping servers in both directions</div></div></div>`
        }
    };

    if (stepDetails[stepNum]) {
        return stepDetails[stepNum];
    } else {
        return {
            overview: `<div class="alert-box alert-info"><strong>Step ${stepNum}:</strong> Detailed guide being developed. Complete instructions coming soon.</div>`,
            howto: `<p>Comprehensive step-by-step instructions will be added here.</p>`,
            validation: `<p>Validation checklist coming soon.</p>`
        };
    }
}