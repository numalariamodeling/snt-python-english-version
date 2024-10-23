function toggleMenu(menuHeader) {
    const submenu = menuHeader.nextElementSibling;
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
}

function loadContent(page) {
    const content = {
        overview: `
            <h3 class="sidebar-title">Version: 3 October 2024 </h3>
            <h3 class="sidebar-title">Authors: Mohamed Sillah Kanu, Sammy Oppong, Jaline Gerardin </h3>
            <h2>Overview</h2>
            <h3>Motivation</h3>
            <p>SNT is here to stay: many NMCPs have found it useful and are continuing to embrace it and further develop it for their analytical needs. Since 2019, multiple individuals have supported the analysis portions of SNT. In most cases, individuals have built their own code in a variety of languages (Stata, R, and Python), sometimes building on others’ previous code and sometimes re-developed independently.
           
As SNT matures, more quality assurance is needed such that NMCPs can be confident that the analysis they use to inform their decisions is of high quality regardless of the individual supporting analyst. The continued rollout of SNT also means that analysis can become more efficient if analysts are better able to build on each other’s work rather than tempted to reinvent what has already been developed. Lastly, SNT analysis can become much more accessible if there is a common resource available to help those with intermediate coding skills quickly access the collective knowledge of the SNT analyst community.
.</p>

            <h3>Objectives</h3>
            <p>We will build a code library for SNT analysis to:
            <p>1. Improve quality and reproducibility of SNT analysis by ensuring that analysts are using similar, correct approaches.</p>
            <p>2. Improve efficiency of SNT analysis by minimizing duplication of effort.</p>
            <p>3. Promote accessibility of SNT analysis by lowering barriers to entry.</p>


            <h3>Target audience</h3>
            <p>Anyone doing this kind of work. We assume some basic knowledge of R, some understanding of the data, and a strong connection to the NMCP.</p>

            <h3>Scope</h3>
            <p>All analysis steps of SNT up to but not including mathematical modeling; some related analysis.</p>
        `,
#
        shapefiles: `     
            <div class="fixed-buttons id="fixedButtons">
               <button class="text-button">On this page:</button>
               <button class="text-button" data-section="stepByStep" onclick="scrollToSection('stepByStep')">Step-by-step</button>
               <button class="text-button" onclick="scrollToSection('fullCode')">Full code</button>
               <button class="text-button" onclick="scrollToSection('sampleR')">Sample results</button>
            </div>

            <h5>A. Data Assembly and Management/Shapefiles</h5>
            <h3 style="color: #47B5FF;">Shapefiles</h3>
            <p><em>This section explains the workflow of importing and managing shapefiles using Python.</em></p>

            <div class="round-buttons">
                <button class="rect-button" onclick="window.location.href='https://numalariamodeling.github.io/snt-code-library-english-version/#shapefiles';">View R En</button>
                <button class="rect-button" onclick="window.location.href='https://numalariamodeling.github.io/snt-code-library-french-version/#shapefiles';">View R FR</button>
                <button class="rect-button" onclick="window.location.href='https://numalariamodeling.github.io/snt-python-french-version/#shapefiles';">View py FR</button>
                <button class="rect-button" onclick="window.location.href='https://numalariamodeling.github.io/snt-code-library-french-version/#shapefiles';">View St FR</button>
                <button class="rect-button" onclick="window.location.href='https://numalariamodeling.github.io/snt-python-french-version/#shapefiles';">View St FR</button>
            </div>
            
            <h4 id="stepByStep">Step-by-step guide</h4>
            <h5 style="color: #ADD8E6;">Step 1: Install Necessary Libraries</h5>
            
            <p>Before starting, ensure you have the required Python packages installed.</p>
            <p>This can be done using the following code:</p>
            <pre><code>
# Install necessary libraries

pip install geopandas matplotlib pandas      
            </code><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --></pre>
            <p>This code installs the <code>geopandas</code> package for handling spatial data, <code>matplotlib</code> for data visualization, and <code>pandas</code> for data manipulation.</p>
          
            <h5 style="color: #ADD8E6;">Step 2: Load Necessary Libraries</h5>
            <p>After installing the libraries, you need to load them into your Python environment:</p>
            <pre><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --><code>            
# Load necessary libraries
import geopandas as gpd
import pandas as pd
import matplotlib.pyplot as plt
            </code></pre>
            <p>This step makes the functions from these libraries available for use in your script.</p>   
            <h5 style="color: #ADD8E6;">Step 3: Import Shapefiles</h5>
            <p>You can import shapefiles using the <code>read_file</code> function from the <code>geopandas</code> package. Here’s a function to do that:</p>
            <pre><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --><code>
# Import Shapefiles
def import_shapefile(filepath):
    shapefile = gpd.read_file(filepath)  # Read the shapefile
    return shapefile  # Return the loaded shapefile
            </code></pre>
            <p>This function takes a file path as input, reads the shapefile, and returns it as a spatial object.</p>     
            <h5 style="color: #ADD8E6;">Step 4: Rename and Match Names</h5>
            <p>Sometimes, the columns in your shapefile may need to be renamed for clarity or to match other datasets. You can do this as follows:</p>
            <pre><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --><code>
# Rename and Match Names
def rename_shapefile_columns(shapefile, new_names):
    shapefile.columns = new_names  # Rename columns
    return shapefile  # Return the renamed shapefile
            </code><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --></pre>
            <p>This function takes a shapefile and a list of new names, renaming the columns accordingly.</p>

          
            <h5 style="color: #ADD8E6;">Step 5: Link Shapefiles to Relevant Scales</h5>
            <p>Link your shapefile to relevant scales or metadata by merging it with another data frame:</p>
            <pre><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --><code>
# Link Shapefiles to Relevant Scales
def link_shapefiles_to_scales(shapefile, scales_df, link_col):
    linked_shapefile = shapefile.merge(scales_df, on=link_col)  # Merge shapefile with scales
    return linked_shapefile  # Return the linked shapefile
            </code></pre>
            <p>This function performs a merge between the shapefile and a data frame containing scale information based on a specified linking column.</p>
            <h5 style="color: #ADD8E6;">Step 6: Visualizing Shapefiles and Making Basic Maps</h5>
            <p>Finally, you can visualize the shapefile using <code>matplotlib</code> and <code>geopandas</code>. Here’s a function to do that:</p>
            <pre><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --><code>
# Visualizing Shapefiles and Making Basic Maps
def visualize_shapefile(shapefile, variable):
    shapefile.plot(column=variable, cmap='viridis', legend=True)
    plt.title(f'Shapefile Visualization: {variable}')
    plt.show()
            </code><button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here --></pre>
            <p>This function creates a simple map visualization using the spatial data. Replace <code>variable</code> with the name of the variable you want to visualize in the fill aesthetic.</p>

            <h3 id="fullCode">Full code</h3>
          
            <pre id="codeBlock">
                <code>
# Install necessary libraries
pip install geopandas matplotlib pandas

# Load necessary libraries
import geopandas as gpd
import pandas as pd
import matplotlib.pyplot as plt

# Import Shapefiles
def import_shapefile(filepath):
    shapefile = gpd.read_file(filepath)  # Read the shapefile
    return shapefile  # Return the loaded shapefile

# Rename and Match Names
def rename_shapefile_columns(shapefile, new_names):
    shapefile.columns = new_names  # Rename columns
    return shapefile  # Return the renamed shapefile

# Link Shapefiles to Relevant Scales
def link_shapefiles_to_scales(shapefile, scales_df, link_col):
    linked_shapefile = shapefile.merge(scales_df, on=link_col)  # Merge shapefile with scales
    return linked_shapefile  # Return the linked shapefile

# Visualizing Shapefiles and Making Basic Maps
def visualize_shapefile(shapefile, variable):
    shapefile.plot(column=variable, cmap='viridis', legend=True)
    plt.title(f'Shapefile Visualization: {variable}')
    plt.show()
                </code>
                <button class="copy-button" onclick="copyCode()">Copy Code</button> <!-- Copy button positioned here -->
            </pre>


            <h3 id="sampleR">Sample results</h3>
            <img src="https://raw.githubusercontent.com/numalariamodeling/snt-code-library-english-version/a204dc53be5209fc170acbfbb5db8900930a80fa/MAP_PYTHON.png" alt="Sample Results">;
           
     
           
        `,  

         
        
    };

    document.getElementById('content').innerHTML = content[page];
}

window.onload = function() {
    // Get the current URL
    const currentUrl = window.location.href;

    // Example 1: Load 'overview' if URL contains '#Overview'
    if (currentUrl.includes('#Overview')) {
        loadContent('overview');
    }

    // Example 2: Load 'shapefiles' if URL contains '#Shapefiles'
    if (currentUrl.includes('#shapefiles')) {
        loadContent('shapefiles');
    }

    // Example 3: Load 'data-management' if URL contains '#DataManagement'
    if (currentUrl.includes('#hf')) {
        loadContent('hf');
    }
};



// Function to scroll to the section when the button is clicked
function scrollToSection(sectionId) {
    // Scroll to the specific section smoothly
    document.getElementById(sectionId).scrollIntoView({ behavior: 'auto' });
    
    // Remove the 'active' class from all buttons
    document.querySelectorAll('.text-button').forEach(button => button.classList.remove('active'));
    
    // Add the 'active' class to the clicked button
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

// Function to check which section is at the top and update the active button
function handleScroll() {
    const sections = ['stepByStep', 'sampleR', 'fullCode'];
    let activeSection = null;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const rect = section.getBoundingClientRect();
        
        // Check if the section is exactly at the top of the viewport
        if (rect.top <= 0 && rect.bottom >= 0) {
            activeSection = sectionId;
        }
    });

    // Remove the 'active' class from all buttons
    document.querySelectorAll('.text-button').forEach(button => button.classList.remove('active'));

    // Add the 'active' class to the button corresponding to the section at the top
    if (activeSection) {
        document.querySelector(`[data-section="${activeSection}"]`).classList.add('active');
    }
}

// Attach the scroll event listener to update the active button based on scroll position
window.addEventListener('scroll', handleScroll);


function copyCode() {
    const codeBlock = document.getElementById("codeBlock").innerText;
    navigator.clipboard.writeText(codeBlock).then(() => {
        alert("Code copied to clipboard!");
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

document.querySelector('.search-bar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-link, .menu-header');
    
    menuItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'block'; // Show matching items
        } else {
            item.style.display = 'none'; // Hide non-matching items
        }
    });
});

// Function to handle link selection
function selectLink(selectedLink) {
    // Remove 'selected' class from all links
    var links = document.getElementsByClassName('menu-link');
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('selected');
    }
    // Add 'selected' class to the clicked link
    selectedLink.classList.add('selected');
}

function toggleMenu(menuHeader) {
    var submenu = menuHeader.nextElementSibling; // Get the submenu
    if (submenu.style.display === "none" || submenu.style.display === "") {
        submenu.style.display = "block"; // Show the submenu
        menuHeader.querySelector('.menu-indicator').textContent = 'v'; // Change indicator to 'v'
    } else {
        submenu.style.display = "none"; // Hide the submenu
        menuHeader.querySelector('.menu-indicator').textContent = '>'; // Change indicator back to '>'
    }
}

// Add styles for rectangular buttons
const styles = `
    .rect-buttons {
        display: flex;
        gap: 10px; /* Adds space between the buttons */
        margin-top: 10px;
    }

    .rect-button {
        width: 100px;  /* Set width to make the button rectangular */
        height: 40px;  /* Set height for better visibility */
        border-radius: 5px; /* Small radius for slightly rounded corners, or set to 0 for sharp edges */
        border: none;
        background-color: #47B5FF;
        color: white;
        font-size: 14px;
        cursor: pointer;
    }
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);     





document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.fixed-buttons');

    function changeButtonColorOnScroll() {
        if (window.scrollY > 50) { // Change '100' to the scroll distance you want
            button.classList.add('scrolled');
        } else {
            button.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', changeButtonColorOnScroll);
});
















document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.text-button');
    const headings = document.querySelectorAll('h3'); // All headings to track

    function updateButtonState() {
        // Get the current scroll position
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        // Loop through all headings
        headings.forEach((heading) => {
            const headingTop = heading.offsetTop;

            if (scrollPosition >= headingTop) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateButtonState);
    updateButtonState(); // Initial call in case already scrolled
});


    };

    document.getElementById('content').innerHTML = content[page];
}

window.onload = function() {
    // Get the current URL
    const currentUrl = window.location.href;

    // Example 1: Load 'overview' if URL contains '#Overview'
    if (currentUrl.includes('#Overview')) {
        loadContent('overview');
    }

    // Example 2: Load 'shapefiles' if URL contains '#Shapefiles'
    if (currentUrl.includes('#shapefiles')) {
        loadContent('shapefiles');
    }

    // Example 3: Load 'data-management' if URL contains '#DataManagement'
    if (currentUrl.includes('#hf')) {
        loadContent('hf');
    }
};



// Function to scroll to the section when the button is clicked
function scrollToSection(sectionId) {
    // Scroll to the specific section smoothly
    document.getElementById(sectionId).scrollIntoView({ behavior: 'auto' });
    
    // Remove the 'active' class from all buttons
    document.querySelectorAll('.text-button').forEach(button => button.classList.remove('active'));
    
    // Add the 'active' class to the clicked button
    document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');
}

// Function to check which section is at the top and update the active button
function handleScroll() {
    const sections = ['stepByStep', 'sampleR', 'fullCode'];
    let activeSection = null;

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const rect = section.getBoundingClientRect();
        
        // Check if the section is exactly at the top of the viewport
        if (rect.top <= 0 && rect.bottom >= 0) {
            activeSection = sectionId;
        }
    });

    // Remove the 'active' class from all buttons
    document.querySelectorAll('.text-button').forEach(button => button.classList.remove('active'));

    // Add the 'active' class to the button corresponding to the section at the top
    if (activeSection) {
        document.querySelector(`[data-section="${activeSection}"]`).classList.add('active');
    }
}

// Attach the scroll event listener to update the active button based on scroll position
window.addEventListener('scroll', handleScroll);


function copyCode() {
    const codeBlock = document.getElementById("codeBlock").innerText;
    navigator.clipboard.writeText(codeBlock).then(() => {
        alert("Code copied to clipboard!");
    }).catch(err => {
        console.error('Error copying text: ', err);
    });
}

document.querySelector('.search-bar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-link, .menu-header');
    
    menuItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
            item.style.display = 'block'; // Show matching items
        } else {
            item.style.display = 'none'; // Hide non-matching items
        }
    });
});

// Function to handle link selection
function selectLink(selectedLink) {
    // Remove 'selected' class from all links
    var links = document.getElementsByClassName('menu-link');
    for (var i = 0; i < links.length; i++) {
        links[i].classList.remove('selected');
    }
    // Add 'selected' class to the clicked link
    selectedLink.classList.add('selected');
}

function toggleMenu(menuHeader) {
    var submenu = menuHeader.nextElementSibling; // Get the submenu
    if (submenu.style.display === "none" || submenu.style.display === "") {
        submenu.style.display = "block"; // Show the submenu
        menuHeader.querySelector('.menu-indicator').textContent = 'v'; // Change indicator to 'v'
    } else {
        submenu.style.display = "none"; // Hide the submenu
        menuHeader.querySelector('.menu-indicator').textContent = '>'; // Change indicator back to '>'
    }
}

// Add styles for rectangular buttons
const styles = `
    .rect-buttons {
        display: flex;
        gap: 10px; /* Adds space between the buttons */
        margin-top: 10px;
    }

    .rect-button {
        width: 100px;  /* Set width to make the button rectangular */
        height: 40px;  /* Set height for better visibility */
        border-radius: 5px; /* Small radius for slightly rounded corners, or set to 0 for sharp edges */
        border: none;
        background-color: #47B5FF;
        color: white;
        font-size: 14px;
        cursor: pointer;
    }
`;

// Inject styles into the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);     





document.addEventListener("DOMContentLoaded", function() {
    const button = document.querySelector('.fixed-buttons');

    function changeButtonColorOnScroll() {
        if (window.scrollY > 50) { // Change '100' to the scroll distance you want
            button.classList.add('scrolled');
        } else {
            button.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', changeButtonColorOnScroll);
});
















document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector('.text-button');
    const headings = document.querySelectorAll('h3'); // All headings to track

    function updateButtonState() {
        // Get the current scroll position
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        // Loop through all headings
        headings.forEach((heading) => {
            const headingTop = heading.offsetTop;

            if (scrollPosition >= headingTop) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', updateButtonState);
    updateButtonState(); // Initial call in case already scrolled
});
