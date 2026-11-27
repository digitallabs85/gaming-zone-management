// keep your existing imports at the top (Room, Station, Customer, Session, Payment, Shift, ActivityLog, Pricing, Settings, User)

export interface DB {
    rooms: Room[];
    stations: Station[];
    customers: Customer[];
    sessions: Session[];
    payments: Payment[];
    shifts: Shift[];
    logs: ActivityLog[];
    pricing: Pricing;
    settings: Settings;
    users: User[];
}

const st = (
    id: string, name: string, number: string, roomId: string,
    platform: string, category: string, hourlyRate?: number,
): Station => ({
    id, name, number, roomId, platform, category, hourlyRate,
    status: 'available', active: true,
});

export const seed: DB = {
    rooms: [
        { id: 'r1', name: 'PC Area', category: 'PC Gaming Area', capacity: 10, active: true },
        { id: 'r2', name: 'Console Room', category: 'Console Room', capacity: 6, active: true },
        { id: 'r3', name: 'VIP Room', category: 'VIP Room', capacity: 4, hourlyRate: 600, active: true },
        { id: 'r4', name: 'Snooker Hall', category: 'Snooker Hall', capacity: 12, hourlyRate: 600, active: true },
        { id: 'r5', name: 'AC Snooker Room', category: 'Snooker Hall', capacity: 8, hourlyRate: 720, active: true },
    ],
    stations: [
        st('s1', 'PC-01', '1', 'r1', 'PC', 'Gaming PC'),
        st('s2', 'PC-02', '2', 'r1', 'PC', 'Gaming PC'),
        st('s3', 'PC-03', '3', 'r1', 'PC', 'Gaming PC'),
        st('s4', 'PS5-01', '1', 'r2', 'PS5', 'Console'),
        st('s5', 'PS5-02', '2', 'r2', 'PS5', 'Console'),
        st('s6', 'PS5-03', '3', 'r2', 'PS5', 'Console'),
        st('s7', 'VIP-01', '1', 'r3', 'PC', 'VIP'),
        st('s8', 'VIP-02', '2', 'r3', 'PS5', 'VIP'),
        st('s9', 'Snooker-01', '1', 'r4', 'Snooker', 'Snooker Table'),
        st('s10', 'Snooker-02', '2', 'r4', 'Snooker', 'Snooker Table'),
        st('s11', 'Snooker-03', '3', 'r4', 'Snooker', 'Snooker Table'),
        st('s12', 'Pool-01', '4', 'r4', 'Pool', 'Pool Table', 500),
        st('s13', 'AC-Snooker-01', '1', 'r5', 'Snooker', 'Snooker Table'),
        st('s14', 'AC-Snooker-02', '2', 'r5', 'Snooker', 'Snooker Table', 800),
    ],
    customers: [
        { id: 'c1', name: 'Ali Khan', phone: '0300-1111111', createdAt: new Date().toISOString() },
        { id: 'c2', name: 'Hamza Sheikh', phone: '0321-2222222', createdAt: new Date().toISOString() },
    ],
    sessions: [],
    payments: [],
    shifts: [],
    logs: [],
    pricing: {
        defaultHourly: 300,
        defaultHalfHour: 160,
        plans: [
            { id: 'p1', name: '1 Hour', minutes: 60, price: 300 },
            { id: 'p2', name: '2 Hours', minutes: 120, price: 550 },
            { id: 'p3', name: '3 Hours', minutes: 180, price: 800 },
        ],
    },
    settings: { businessName: 'PlayDesk', currency: 'PKR', receiptFooter: 'Thank you for playing!' },
    users: [
        { id: 'u1', name: 'Owner', username: 'owner', password: 'owner123', role: 'owner', active: true },
        { id: 'u2', name: 'Manager', username: 'manager', password: 'manager123', role: 'manager', active: true },
        { id: 'u3', name: 'Cashier', username: 'cashier', password: 'cashier123', role: 'cashier', active: true },
    ],
};