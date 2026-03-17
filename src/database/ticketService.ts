import { db } from './db';

export type InsertTickets = {
  ticket_id: string;
  name: string;
  event_name: string;
  status: 'valid' | 'used';
  created_at: string;
};

export const insertTickets = async (tickets: InsertTickets[]) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tickets.forEach(ticket => {
          tx.executeSql(
            `INSERT OR REPLACE INTO tickets
            (ticket_id, name, event_name, status, updated_at)
            VALUES (?, ?, ?, ?, ?)`,
            [
              ticket.ticket_id,
              ticket.name,
              ticket.event_name,
              ticket.status,
              ticket.created_at,
            ],
          );
        });
      },
      error => {
        console.log('Transaction error:', error);
        reject(error);
      },
      () => {
        resolve(true);
      },
    );
  });
};

export const getLastSync = async () => {
  const res = await db.executeSql(
    `SELECT value FROM sync_meta WHERE key='last_sync'`,
  );

  if (res[0].rows.length > 0) {
    return res[0].rows.item(0).value;
  }

  return null;
};

export const setLastSync = async (timestamp: string) => {
  await db.executeSql(
    `INSERT OR REPLACE INTO sync_meta (key, value)
     VALUES ('last_sync', ?)`,
    [timestamp],
  );
};

export const validateTicket = async (
  ticketId: string,
): Promise<{
  valid: boolean;
  reason: string;
  status: 'valid' | 'used' | 'invalid';
}> => {
  const result = await db.executeSql(
    `SELECT status FROM tickets WHERE ticket_id=?`,
    [ticketId],
  );

  if (result[0].rows.length === 0) {
    return { valid: false, reason: 'Ticket not found', status: 'invalid' };
  }

  const ticket = result[0].rows.item(0);

  if (ticket.status === 'used') {
    return { valid: false, reason: 'Ticket already used', status: 'used' };
  }

  return { valid: true, reason: 'Valid ticket', status: 'valid' };
};

export const markTicketUsed = async (ticketId: string) => {
  await db.executeSql(`UPDATE tickets SET status='used' WHERE ticket_id=?`, [
    ticketId,
  ]);
};
