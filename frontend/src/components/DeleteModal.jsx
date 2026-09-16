// src/components/DeleteModal.jsx
import { X, AlertTriangle } from 'lucide-react';

export default function DeleteModal({ isOpen, onCancel, onConfirm, title }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} />
            <span>Hủy Bỏ Bản Thảo</span>
          </h3>
          <button
            onClick={onCancel}
            aria-label="Đóng hộp thoại"
            className="btn-inline-action"
            style={{ padding: '4px' }}
          >
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <p>
            Bạn có chắc chắn muốn xóa vĩnh viễn bản thảo{' '}
            <em>{title ? `"${title}"` : 'này'}</em> khỏi văn khố lưu trữ không?
            Hành động này là dứt khoát và không thể hoàn tác.
          </p>
        </div>

        <div className="modal-actions">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Giữ lại
          </button>
          <button type="button" onClick={onConfirm} className="btn-danger">
            Xóa vĩnh viễn
          </button>
        </div>
      </div>
    </div>
  );
}
