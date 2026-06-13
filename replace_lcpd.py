with open('src/components/MissionList.tsx', 'r') as f:
    content = f.read()

# Specific targeted replacements
content = content.replace('LIBERTY CITY POLICE DEPT.', 'MOBX POLICE DEPT.')
content = content.replace('PROTECTING LIBERTY CITY', 'PROTECTING MOBX CITY')
content = content.replace('lcpd_database_dump.sql', 'mobx_database_dump.sql')

# Replace all uppercase LCPD with MOBX
content = content.replace('LCPD', 'MOBX')

with open('src/components/MissionList.tsx', 'w') as f:
    f.write(content)

print("Done")
