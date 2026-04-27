#!/bin/bash

# Configuration
SCRIPT_NAME="script.sh"  # Change this to your script filename
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TARGET_SCRIPT="$SCRIPT_DIR/$SCRIPT_NAME"
SCHEDULE="* * * * *"  # Every minute

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "=== Cron Job Setup Script ==="
echo ""

# Check if script exists
if [ ! -f "$TARGET_SCRIPT" ]; then
    echo -e "${RED}Error: Script not found at $TARGET_SCRIPT${NC}"
    echo "Please update the SCRIPT_NAME variable in this script"
    exit 1
fi

# Make sure the target script is executable
chmod +x "$TARGET_SCRIPT"

# Create the cron job command
CRON_CMD="$SCHEDULE $TARGET_SCRIPT >> /tmp/$(basename $TARGET_SCRIPT .sh).log 2>&1"

# Check if cron job already exists
crontab -l 2>/dev/null | grep -F "$TARGET_SCRIPT" > /dev/null
if [ $? -eq 0 ]; then
    echo -e "${RED}Warning: A cron job for this script already exists${NC}"
    echo "Current crontab entries for this script:"
    crontab -l | grep -F "$TARGET_SCRIPT"
    echo ""
    read -p "Do you want to remove the old entry and add a new one? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        # Remove old entry
        crontab -l | grep -v -F "$TARGET_SCRIPT" | crontab -
        echo "Old entry removed"
    else
        echo "Operation cancelled"
        exit 0
    fi
fi

# Add the new cron job
(crontab -l 2>/dev/null; echo "$CRON_CMD") | crontab -

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Success! Cron job added successfully${NC}"
    echo ""
    echo "Details:"
    echo "  Script: $TARGET_SCRIPT"
    echo "  Schedule: $SCHEDULE (every minute)"
    echo "  Log file: /tmp/$(basename $TARGET_SCRIPT .sh).log"
    echo ""
    echo "Current crontab:"
    crontab -l
else
    echo -e "${RED}Error: Failed to add cron job${NC}"
    exit 1
fi