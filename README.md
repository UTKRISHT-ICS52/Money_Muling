# 💸 Money Muling | Graph-Based Financial Crime Detection 🔍

![Python](https://img.shields.io/badge/Python-3.12-blue)
![Node.js](https://img.shields.io/badge/Node.js-22.14-green)
![NetworkX](https://img.shields.io/badge/NetworkX-Graph%20Analysis-orange)
![Matplotlib](https://img.shields.io/badge/Matplotlib-Visualization-red)

---

## 🌟 Overview
**Money Muling** is a **graph-based financial crime detection engine** designed to identify **money muling**, **fraud rings**, and **suspicious transaction patterns**.  
It uses **transaction networks**, **risk scoring**, and **graph analytics** to flag accounts and highlight fraudulent rings.

---

## 🚀 Features
- 🗂 Upload **CSV transaction datasets**  
- 🔗 Automatically build **transaction graphs**  
- 🚨 Detect **suspicious accounts** based on transaction frequency & patterns  
- 🔄 Identify **fraud rings**: cycles, fan-in/fan-out networks  
- 📊 Generate **JSON summaries** for easy reporting  
- 🎨 Visualize networks with **color-coded nodes** (red = suspicious)  

---

## 🛠 Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js + Express  
- **Analysis & Visualization:** Python, Pandas, NetworkX, Matplotlib  


---

##  📊 Visualization
- **Transaction Graph**: Nodes = accounts, Edges = transactions  
- **Red nodes** indicate suspicious accounts  
- **Supports patterns**: cycles, fan-in, fan-out detection  

---

##  ⚖️ Use Cases
- 🏦 Banks & fintech companies for **fraud detection**  
- 🎓 Research & hackathons on **financial crime analytics**  
- 📈 **Dashboard integration** for reporting  

---

##  💾 Installation
1. Clone the repository:  
```bash
git clone https://github.com/UTKRISHT-ICS52/Money_Muling.git

### 1️⃣ Frontend
- Open `index.html`  
- Upload your CSV dataset  
- View **live stats**, suspicious accounts, and fraud rings  

### 2️⃣ Backend (Optional)
```bash
cd money-mule-backend
npm install
npm run dev

from google.colab import files
import pandas as pd
import networkx as nx
import matplotlib.pyplot as plt
from collections import Counter

# Upload CSV
uploaded = files.upload()
file_name = list(uploaded.keys())[0]
df = pd.read_csv(file_name)
df.columns = df.columns.str.strip()

# Detect columns
sender_col = [c for c in df.columns if "from" in c.lower() or "sender" in c.lower()][0]
receiver_col = [c for c in df.columns if "to" in c.lower() or "receiver" in c.lower()][0]
amount_col = [c for c in df.columns if "amount" in c.lower() or "amt" in c.lower()][0]

# Build graph
G = nx.DiGraph()
for i, row in df.iterrows():
    G.add_edge(row[sender_col], row[receiver_col], weight=row[amount_col])

# Detect suspicious accounts
accounts = list(df[sender_col]) + list(df[receiver_col])
freq = Counter(accounts)
suspicious = [acc for acc, count in freq.items() if count > 3]

# JSON summary
summary = {
    "total_accounts_analyzed": len(set(accounts)),
    "suspicious_accounts_flagged": len(suspicious),
    "suspicious_accounts": suspicious
}
print(summary)

