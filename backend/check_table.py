import psycopg2

try:
    conn = psycopg2.connect(
        dbname='tool_management',
        user='postgres',
        password='24155607',
        host='localhost',
        port=5432
    )
    cur = conn.cursor()
    cur.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name='tools';")
    result = cur.fetchone()
    print('FOUND' if result else 'NOT FOUND')
    cur.close()
    conn.close()
except Exception as e:
    print('ERROR', e)
