import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { LogOut, Package, RefreshCw, Download, Eye, X, ChevronDown, Shield, AlertCircle, Loader, Edit } from 'lucide-react';

// custom hook to detect mobile viewport
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return isMobile;
};

// Run this SQL in Supabase to add notes column:
// ALTER TABLE orders ADD COLUMN IF NOT EXISTS notes TEXT;

// ─── TYPES ────────────────────────────────────────────────
interface OrderRow {
  id: string;
  order_id: string;
  date: string;
  full_name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  items: any[];
  total: number;
  status: 'Pending' | 'Paid' | 'Shipped' | 'Delivered' | 'Cancelled';
  payment_method: string;
  notes?: string;
}

const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Paid: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Shipped: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Delivered: 'bg-green-500/10 text-green-400 border-green-500/20',
  Cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const ALL_STATUSES = ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'];

// ─── LOGIN PAGE ───────────────────────────────────────────
const LoginPage: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const isMobile = useIsMobile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError('Invalid credentials. Access denied.');
    } else {
      onLogin();
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Montserrat', sans-serif",
      padding: isMobile ? '1.5rem' : '2rem'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;700&family=Montserrat:wght@200;300;400;500;600&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: '#111',
        border: '1px solid #222',
        padding: isMobile ? '1.5rem' : '3rem',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '3.5rem',
            fontWeight: 700,
            color: '#c9a84c',
            lineHeight: 1,
            marginBottom: '0.3rem'
          }}>F6</div>
          <div style={{
            fontSize: '0.55rem',
            letterSpacing: '0.5em',
            color: '#444',
            textTransform: 'uppercase',
          }}>Admin · Restricted Access</div>
          <div style={{
            width: '40px',
            height: '1px',
            background: '#c9a84c',
            margin: '1.2rem auto 0',
            opacity: 0.4
          }} />
        </div>

        {/* Shield icon */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Shield size={32} color="#c9a84c" style={{ opacity: 0.6 }} />
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              color: '#666',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@f6syndicate.com"
              style={{
                width: '100%',
                background: '#0a0a0a',
                border: '1px solid #222',
                color: '#f0ece4',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: isMobile ? '16px' : '0.8rem',
                fontWeight: 300,
                padding: '0.9rem 1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.55rem',
              letterSpacing: '0.3em',
              color: '#666',
              textTransform: 'uppercase',
              marginBottom: '0.5rem'
            }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••••••"
              style={{
                width: '100%',
                background: '#0a0a0a',
                border: '1px solid #222',
                color: '#f0ece4',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: isMobile ? '16px' : '0.8rem',
                fontWeight: 300,
                padding: '0.9rem 1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(231,76,60,0.08)',
              border: '1px solid rgba(231,76,60,0.2)',
              padding: '0.8rem 1rem',
              marginBottom: '1.2rem',
              fontSize: '0.72rem',
              color: '#e74c3c'
            }}>
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#333' : '#c9a84c',
              color: '#080808',
              border: 'none',
              padding: '1rem',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {loading ? <><Loader size={14} className="animate-spin" /> Verifying...</> : 'Enter Command Centre'}
          </button>
        </form>

        <div style={{
          marginTop: '2rem',
          fontSize: '0.6rem',
          color: '#333',
          textAlign: 'center',
          letterSpacing: '0.1em'
        }}>
          Unauthorised access is strictly prohibited
        </div>
      </div>
    </div>
  );
};

// ─── ORDER DETAIL MODAL ───────────────────────────────────
const OrderModal: React.FC<{ order: OrderRow; onClose: () => void }> = ({ order, onClose }) => {
  const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.92)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Montserrat', sans-serif"
    }}>
      <div style={{
        background: '#111',
        border: '1px solid #222',
        width: '100%',
        maxWidth: '600px',
        maxHeight: '85vh',
        overflowY: 'auto',
        padding: '2.5rem'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid #1a1a1a' }}>
          <div>
            <div style={{ fontSize: '0.55rem', letterSpacing: '0.4em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Order Details</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: '#f0ece4', fontWeight: 300 }}>{order.order_id}</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid #222', color: '#666', cursor: 'pointer', padding: '0.4rem' }}>
            <X size={16} />
          </button>
        </div>

        {/* Customer */}
        <Section title="Customer">
          <Row label="Name" value={order.full_name} />
          <Row label="Email" value={order.email} />
          <Row label="Phone" value={order.phone} />
        </Section>

        {/* Delivery */}
        <Section title="Delivery Address">
          <Row label="Street" value={order.street} />
          <Row label="City" value={`${order.city}, ${order.state} - ${order.zip}`} />
        </Section>

        {/* Items */}
        <Section title="Items Ordered">
          {items && items.map((item: any, i: number) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #1a1a1a', fontSize: '0.75rem' }}>
              <div>
                <div style={{ color: '#f0ece4', marginBottom: '0.2rem' }}>{item.name}</div>
                <div style={{ color: '#555', fontSize: '0.65rem' }}>Size: {item.selectedSize} · Qty: {item.quantity}</div>
              </div>
              <div style={{ color: '#c9a84c', fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem' }}>₹{item.price * item.quantity}</div>
            </div>
          ))}
        </Section>

        {/* Payment */}
        <Section title="Payment">
          <Row label="Method" value={order.payment_method} />
          <Row label="Total" value={`₹${order.total}`} gold />
          <Row label="Status" value={order.status} />
        </Section>

        <div style={{ marginTop: '1.5rem', fontSize: '0.65rem', color: '#333', letterSpacing: '0.1em' }}>
          Placed on {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <div style={{ fontSize: '0.55rem', letterSpacing: '0.35em', color: '#c9a84c', textTransform: 'uppercase', marginBottom: '0.8rem', opacity: 0.7 }}>{title}</div>
    {children}
  </div>
);

const Row: React.FC<{ label: string; value: string; gold?: boolean }> = ({ label, value, gold }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1a1a1a', fontSize: '0.75rem' }}>
    <span style={{ color: '#555' }}>{label}</span>
    <span style={{ color: gold ? '#c9a84c' : '#f0ece4', fontWeight: gold ? 600 : 300 }}>{value}</span>
  </div>
);

// ─── MAIN DASHBOARD ───────────────────────────────────────
const Dashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const isMobile = useIsMobile();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<OrderRow | null>(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<OrderRow | null>(null);
  const [editFields, setEditFields] = useState<{ status: string; payment_method: string; notes: string }>({ status: '', payment_method: '', notes: '' });
  const [saveMessage, setSaveMessage] = useState('');


  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('date', { ascending: false });
    if (!error && data) setOrders(data as OrderRow[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    await supabase.from('orders').update({ status: newStatus }).eq('order_id', orderId);
    setOrders(prev => prev.map(o => o.order_id === orderId ? { ...o, status: newStatus as any } : o));
    setUpdatingId(null);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  const downloadCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer', 'Email', 'Phone', 'City', 'Total', 'Status', 'Payment'];
    const rows = filteredOrders.map(o => [
      o.order_id,
      new Date(o.date).toLocaleDateString('en-IN'),
      o.full_name,
      o.email,
      o.phone,
      `${o.city} ${o.zip}`,
      `₹${o.total}`,
      o.status,
      o.payment_method
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `f6-orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredOrders = orders.filter(o => {
    const matchStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchSearch = !search ||
      o.order_id.toLowerCase().includes(search.toLowerCase()) ||
      o.full_name.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Stats
  const totalRevenue = orders.reduce((acc, o) => acc + Number(o.total), 0);
  const pending = orders.filter(o => o.status === 'Pending').length;
  const shipped = orders.filter(o => o.status === 'Shipped').length;
  const delivered = orders.filter(o => o.status === 'Delivered').length;
  const confirmedRevenue = orders.reduce((acc, o) => o.status === 'Delivered' ? acc + Number(o.total) : acc, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      fontFamily: "'Montserrat', sans-serif",
      color: '#f0ece4',
      overflowX: 'hidden',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;700&family=Montserrat:wght@200;300;400;500;600&display=swap" rel="stylesheet" />

      {/* TOP BAR */}
      <div style={{
        borderBottom: '1px solid #1a1a1a',
        padding: isMobile ? '0.8rem 1rem' : '1.2rem 2.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#0a0a0a',
        flexWrap: 'wrap',
        gap: '0.5rem',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#c9a84c', lineHeight: 1 }}>F6</div>
          <div style={{ width: '1px', height: '24px', background: '#1a1a1a', display: isMobile ? 'none' : 'block' }} />
          <div style={{ fontSize: '0.6rem', letterSpacing: '0.35em', color: '#444', textTransform: 'uppercase', display: isMobile ? 'none' : 'block' }}>Command Centre</div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button onClick={fetchOrders} style={{ background: 'none', border: '1px solid #1a1a1a', color: '#666', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center', minHeight: '44px' }}>
            <RefreshCw size={14} />
            {!isMobile && <span className="ml-1" style={{fontSize:'0.6rem',letterSpacing:'0.2em',textTransform:'uppercase'}}>Refresh</span>}
          </button>
          <button onClick={downloadCSV} style={{ background: 'none', border: '1px solid #1a1a1a', color: '#666', cursor: 'pointer', padding: isMobile ? '0.5rem' : '0.5rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', minHeight: '44px' }}>
            <Download size={13} />
            {!isMobile && ' Export CSV'}
          </button>
          <button onClick={handleLogout} style={{ background: 'none', border: '1px solid #1a1a1a', color: '#666', cursor: 'pointer', padding: isMobile ? '0.5rem' : '0.5rem 0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', minHeight: '44px' }}>
            <LogOut size={13} />
            {!isMobile && ' Logout'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: isMobile ? '1rem' : '2.5rem', overflowX: 'hidden', width: '100%', boxSizing: 'border-box' }}>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)', gap: '1px', background: '#1a1a1a', border: '1px solid #1a1a1a', marginBottom: '2.5rem' }}>
          {[
            { label: 'Total Orders', value: orders.length, suffix: '', show: true },
            { label: 'Total Revenue', value: `₹${totalRevenue.toLocaleString('en-IN')}`, suffix: '', show: true },
            { label: 'Pending', value: pending, suffix: '', show: true },
            { label: 'Shipped', value: shipped, suffix: '', show: !isMobile },
            { label: 'Delivered', value: delivered, suffix: '', show: !isMobile },
            { label: 'Confirmed Revenue', value: `₹${confirmedRevenue.toLocaleString('en-IN')}`, suffix: '', show: true },
          ].filter(s => s.show).map((stat, i) => (
            <div key={i} style={{ background: '#0f0f0f', padding: '1.8rem 2rem' }}>
              <div style={{ fontSize: '0.55rem', letterSpacing: '0.35em', color: '#444', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{stat.label}</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', color: '#c9a84c', fontWeight: 300, lineHeight: 1 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* FILTERS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Search by order ID, name, email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: '#0f0f0f',
              border: '1px solid #1a1a1a',
              color: '#f0ece4',
              fontFamily: "'Montserrat', sans-serif",
              fontSize: isMobile ? '1rem' : '0.75rem',
              fontWeight: 300,
              padding: '0.75rem 1rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['All', ...ALL_STATUSES].map(s => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                style={{
                  background: statusFilter === s ? '#c9a84c' : '#0f0f0f',
                  color: statusFilter === s ? '#080808' : '#555',
                  border: `1px solid ${statusFilter === s ? '#c9a84c' : '#1a1a1a'}`,
                  padding: isMobile ? '0.6rem 0.8rem' : '0.5rem 1rem',
                  fontSize: isMobile ? '0.55rem' : '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  fontFamily: "'Montserrat', sans-serif",
                  fontWeight: statusFilter === s ? 600 : 300,
                  flex: isMobile ? '1 1 auto' : 'auto',
                  minWidth: '60px'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE / CARDS */}
        <div style={{ border: isMobile ? 'none' : '1px solid #1a1a1a', overflow: 'hidden' }}>
          {/* Table Header - Hide on mobile */}
          {!isMobile && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr 1.5fr 0.8fr 0.8fr 1fr 1.5fr 0.5fr 0.5fr',
              background: '#0a0a0a',
              borderBottom: '1px solid #1a1a1a',
              padding: '0.9rem 1.5rem',
              gap: '1rem'
            }}>
              {['Order ID', 'Date', 'Customer', 'Phone', 'City', 'Total', 'Payment', 'Status', 'Actions'].map(h => (
                <div key={h} style={{ fontSize: '0.55rem', letterSpacing: '0.3em', color: '#c9a84c', textTransform: 'uppercase', fontWeight: 600 }}>{h}</div>
              ))}
            </div>
          )}

          {/* Rows */}
          {loading ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#333', fontSize: '0.75rem' }}>
              <Loader size={20} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.3 }} />
              Loading orders...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center', color: '#333' }}>
              <Package size={32} style={{ margin: '0 auto 1rem', display: 'block', opacity: 0.2 }} />
              <div style={{ fontSize: '0.75rem' }}>No orders found</div>
            </div>
          ) : !isMobile ? (
            filteredOrders.map((order, idx) => (
              <React.Fragment key={order.id}>
              <div
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 1fr 1.5fr 0.8fr 0.8fr 1fr 1.5fr 0.5fr 0.5fr',
                  padding: '1.2rem 1.5rem',
                  gap: '1rem',
                  borderBottom: '1px solid #111',
                  background: idx % 2 === 0 ? '#0a0a0a' : '#0d0d0d',
                  alignItems: 'center',
                  transition: 'background 0.2s',
                  cursor: 'pointer'
                }}
              >
                {/* Order ID */}
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#c9a84c' }}>{order.order_id}</div>

                {/* Date */}
                <div style={{ fontSize: '0.7rem', color: '#555' }}>
                  {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </div>

                {/* Customer */}
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#f0ece4', marginBottom: '0.2rem' }}>{order.full_name}</div>
                  <div style={{ fontSize: '0.62rem', color: '#444' }}>{order.email}</div>
                </div>

                {/* Phone */}
                <div style={{ fontSize: '0.65rem', color: '#555' }}>{order.phone}</div>

                {/* City */}
                <div style={{ fontSize: '0.65rem', color: '#555' }}>{order.city}</div>

                {/* Total */}
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: '#f0ece4' }}>₹{order.total}</div>

                {/* Payment */}
                <div style={{ fontSize: '0.65rem', color: '#555' }}>{order.payment_method}</div>

                {/* Status Dropdown */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div 
                    style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.6rem',
                      fontSize: '0.55rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      borderRadius: '2px',
                      background: STATUS_COLORS[order.status].split(' ')[0],
                      color: STATUS_COLORS[order.status].split(' ')[1],
                      border: `1px solid ${STATUS_COLORS[order.status].split(' ')[2]}`
                    }}
                  >
                    {order.status}
                  </div>
                  <select
                    value={order.status}
                    onChange={e => updateStatus(order.order_id, e.target.value)}
                    disabled={updatingId === order.order_id}
                    style={{
                      background: '#111',
                      border: '1px solid #1a1a1a',
                      color: '#f0ece4',
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: '0.6rem',
                      letterSpacing: '0.15em',
                      padding: '0.4rem 0.7rem',
                      cursor: 'pointer',
                      outline: 'none',
                      width: '100%',
                      appearance: 'none',
                      textTransform: 'uppercase'
                    }}
                  >
                    {ALL_STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* View button */}
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <button
                    onClick={e => { e.stopPropagation(); setEditingOrder(order); setEditFields({ status: order.status, payment_method: order.payment_method, notes: order.notes || '' }); }}
                    style={{
                      background: 'none',
                      border: '1px solid #1a1a1a',
                      color: '#555',
                      cursor: 'pointer',
                      padding: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setSelectedOrder(order); }}
                    style={{
                      background: 'none',
                      border: '1px solid #1a1a1a',
                      color: '#555',
                      cursor: 'pointer',
                      padding: '0.4rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>
              {expandedId === order.id && (
                <div style={{ background: '#111', color: '#f0ece4', padding: '1rem 2rem', borderBottom: '1px solid #111', fontSize: '0.75rem' }}>
                  <div className="mb-2"><span className="font-bold text-gray-400">Phone:</span> {order.phone}</div>
                  <div className="mb-2"><span className="font-bold text-gray-400">Address:</span> {order.street}, {order.city}, {order.state} {order.zip}</div>
                  <div className="mb-2"><span className="font-bold text-gray-400">Payment:</span> {order.payment_method}</div>
                  <div className="mt-2">
                    <div className="font-bold text-gray-400 mb-1">Items:</div>
                    {order.items && order.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between text-sm mb-1">
                        <div>{item.name} ({item.selectedSize}) ×{item.quantity}</div>
                        <div>₹{item.price} / ₹{item.price * item.quantity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </React.Fragment>
            ))
          ) : null}
        </div>

        {/* MOBILE ORDER CARDS */}
        {isMobile && !loading && filteredOrders.length > 0 && (
          <div>
            {filteredOrders.map(order => (
              <div key={order.id} style={{ background: '#0f0f0f', border: '1px solid #1a1a1a', padding: '1.2rem', marginBottom: '1px', width: '100%', boxSizing: 'border-box' }}>
                {/* Row 1: Order ID + Date */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', alignItems: 'flex-start' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.7rem', color: '#c9a84c' }}>{order.order_id}</div>
                  <div style={{ fontSize: '0.65rem', color: '#555' }}>{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                </div>
                {/* Row 2: Customer name */}
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f0ece4', marginBottom: '0.6rem' }}>{order.full_name}</div>
                {/* Row 3: Email + Phone */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '0.8rem', fontSize: '0.7rem', color: '#555' }}>
                  <div>{order.email}</div>
                  <div>{order.phone}</div>
                </div>
                {/* Row 4: City + Total */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.7rem', color: '#555' }}>{order.city}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: '#c9a84c', fontWeight: 700 }}>₹{order.total}</div>
                </div>
                {/* Row 5: Payment + Status in flex */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.8rem', fontSize: '0.7rem' }}>
                  <div style={{ color: '#555' }}>{order.payment_method}</div>
                </div>
                {/* Status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <div 
                    style={{
                      display: 'inline-block',
                      padding: '0.2rem 0.6rem',
                      fontSize: '0.55rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      borderRadius: '2px',
                      background: STATUS_COLORS[order.status].split(' ')[0],
                      color: STATUS_COLORS[order.status].split(' ')[1],
                      border: `1px solid ${STATUS_COLORS[order.status].split(' ')[2]}`
                    }}
                  >
                    {order.status}
                  </div>
                </div>
                {/* Status Dropdown */}
                <select
                  value={order.status}
                  onChange={e => updateStatus(order.order_id, e.target.value)}
                  disabled={updatingId === order.order_id}
                  style={{
                    width: '100%',
                    background: '#111',
                    border: '1px solid #1a1a1a',
                    color: '#f0ece4',
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: '0.7rem',
                    padding: '0.7rem',
                    cursor: 'pointer',
                    outline: 'none',
                    marginBottom: '0.8rem',
                    minHeight: '44px',
                    boxSizing: 'border-box'
                  }}
                >
                  {ALL_STATUSES.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {/* Row 6: Action buttons */}
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => setSelectedOrder(order)}
                    style={{
                      flex: 1,
                      height: '44px',
                      background: '#111',
                      border: '1px solid #1a1a1a',
                      color: '#888',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    <Eye size={14} />
                    Details
                  </button>
                  <button
                    onClick={() => { setEditingOrder(order); setEditFields({ status: order.status, payment_method: order.payment_method, notes: order.notes || '' }); }}
                    style={{
                      flex: 1,
                      height: '44px',
                      background: '#111',
                      border: '1px solid #1a1a1a',
                      color: '#888',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      fontFamily: "'Montserrat', sans-serif"
                    }}
                  >
                    <Edit size={14} />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: '1.5rem', fontSize: '0.6rem', color: '#222', letterSpacing: '0.2em', textAlign: 'center' }}>
          F6 SYNDICATE · COMMAND CENTRE · {filteredOrders.length} ORDERS SHOWN
        </div>
      </div>

      {/* Order Modal */}
      {selectedOrder && (
        <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}

      {/* Edit Order Modal */}
      {editingOrder && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.92)',
          zIndex: 1000,
          display: 'flex',
          alignItems: isMobile ? 'flex-end' : 'center',
          justifyContent: 'center',
          padding: isMobile ? '0' : '2rem'
        }}>
          <div style={{
            background: '#111',
            border: '1px solid #222',
            width: '100%',
            maxWidth: isMobile ? '100%' : '500px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2.5rem',
            borderRadius: isMobile ? '12px 12px 0 0' : '0'
          }}>
            {isMobile && (
              <div style={{
                width: '40px',
                height: '4px',
                background: '#333',
                borderRadius: '2px',
                margin: '0 auto 1.5rem'
              }} />
            )}
            <h2 style={{ color: '#c9a84c', fontSize: '1.5rem', marginBottom: '1rem' }}>Edit Order {editingOrder.order_id}</h2>
            <div style={{ color: '#f0ece4', marginBottom: '1rem' }}>{saveMessage && <span style={{ color: '#4ade80' }}>{saveMessage}</span>}</div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '0.3rem' }}>Status</label>
              <select
                value={editFields.status}
                onChange={e => setEditFields(f => ({ ...f, status: e.target.value }))}
                style={{ width: '100%', padding: '0.5rem', background: '#111', color: '#f0ece4', border: '1px solid #333' }}
              >
                {ALL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '0.3rem' }}>Payment Method</label>
              <input
                type="text"
                value={editFields.payment_method}
                onChange={e => setEditFields(f => ({ ...f, payment_method: e.target.value }))}
                style={{ width: '100%', padding: '0.5rem', background: '#111', color: '#f0ece4', border: '1px solid #333' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#aaa', marginBottom: '0.3rem' }}>Notes</label>
              <textarea
                value={editFields.notes}
                onChange={e => setEditFields(f => ({ ...f, notes: e.target.value }))}
                style={{ width: '100%', padding: '0.5rem', background: '#111', color: '#f0ece4', border: '1px solid #333' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button
                onClick={() => {
                  // Save
                  (async () => {
                    const { error } = await supabase
                      .from('orders')
                      .update({ status: editFields.status, payment_method: editFields.payment_method, notes: editFields.notes })
                      .eq('order_id', editingOrder.order_id);
                    if (!error) {
                      setOrders(prev => prev.map(o => o.order_id === editingOrder.order_id ? { ...o, ...editFields } as any : o));
                      setSaveMessage('Saved successfully');
                      setTimeout(() => setSaveMessage(''), 2000);
                    } else {
                      alert('Save failed');
                    }
                  })();
                }}
                style={{ padding: '0.6rem 1.2rem', background: '#c9a84c', color: '#080808', border: 'none', cursor: 'pointer' }}
              >Save</button>
              <button
                onClick={() => setEditingOrder(null)}
                style={{ padding: '0.6rem 1.2rem', background: '#333', color: '#f0ece4', border: 'none', cursor: 'pointer' }}
              >Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── ROOT ADMIN COMPONENT ─────────────────────────────────
const AdminDashboard: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader size={24} color="#c9a84c" style={{ opacity: 0.4 }} />
      </div>
    );
  }

  if (!session) return <LoginPage onLogin={() => {}} />;
  return <Dashboard onLogout={() => setSession(null)} />;
};

export default AdminDashboard;