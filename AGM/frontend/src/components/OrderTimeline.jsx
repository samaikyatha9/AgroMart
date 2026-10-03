import React from 'react';
import { CheckCircle2, Clock, Package, Truck, Home, XCircle } from 'lucide-react';

const OrderTimeline = ({ status }) => {
  const steps = [
    { key: 'PENDING', label: 'Placed', icon: Clock },
    { key: 'CONFIRMED', label: 'Confirmed', icon: CheckCircle2 },
    { key: 'PACKED', label: 'Packed', icon: Package },
    { key: 'SHIPPED', label: 'Shipped', icon: Truck },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck },
    { key: 'DELIVERED', label: 'Delivered', icon: Home },
  ];

  if (status === 'CANCELLED') {
    return (
      <div style={{
        background: '#fee2e2',
        border: '1px solid #fca5a5',
        borderRadius: '12px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: '#991b1b',
        fontWeight: '600'
      }}>
        <XCircle size={24} />
        <div>This order was cancelled. Restocked in inventory.</div>
      </div>
    );
  }

  const statusIndex = steps.findIndex(s => s.key === status);
  const currentIndex = statusIndex === -1 ? 0 : statusIndex;

  return (
    <div style={{ padding: '1rem 0' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        width: '100%'
      }}>
        {steps.map((step, idx) => {
          const isDone = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          const StepIcon = step.icon;

          return (
            <div
              key={step.key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: 1,
                position: 'relative',
                zIndex: 2
              }}
            >
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: isDone ? '#2e7d32' : '#f1f5f9',
                  color: isDone ? '#ffffff' : '#94a3b8',
                  border: isCurrent ? '3px solid #bbf7d0' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '0.5rem',
                  boxShadow: isCurrent ? '0 0 0 4px rgba(46, 125, 50, 0.2)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <StepIcon size={18} />
              </div>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: isCurrent ? '700' : isDone ? '600' : '500',
                color: isDone ? '#1b5e20' : '#94a3b8'
              }}>
                {step.label}
              </div>
            </div>
          );
        })}

        {/* Background connector line */}
        <div style={{
          position: 'absolute',
          top: '19px',
          left: '5%',
          right: '5%',
          height: '3px',
          backgroundColor: '#e2e8f0',
          zIndex: 1
        }}>
          <div style={{
            height: '100%',
            backgroundColor: '#2e7d32',
            width: `${(currentIndex / (steps.length - 1)) * 100}%`,
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>
    </div>
  );
};

export default OrderTimeline;
