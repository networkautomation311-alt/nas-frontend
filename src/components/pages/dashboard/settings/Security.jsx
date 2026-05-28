import React, { useState } from 'react';

const Security = () => {
  const [showSetup, setShowSetup] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [secret, setSecret] = useState(null);
  const [error, setError] = useState(null);

  const handleEnable2FA = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('https://portfolio-backend-3nr9.onrender.com/api/v1/auth/2fa/enable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
        credentials: 'include'
      });

      const text = await res.text();
      let data;
      try { data = text ? JSON.parse(text) : null; } catch (e) {
        throw new Error('Invalid JSON from server: ' + text);
      }

      if (!res.ok) {
        throw new Error(data?.message || data?.msg || 'Enable 2FA failed');
      }

      setQrDataUrl(data.qrDataUrl || null);
      setSecret(data.secret || null);
      setShowSetup(true);
    } catch (err) {
      console.error('enable2FA error', err);
      setError(err.message || 'Failed to enable 2FA');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = e => setAuthCode(e.target.value);

  const handleNextRecovery = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('http://localhost:5000/api/v1/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: authCode,
        }),
        credentials: 'include'
      });

      const text = await res.text();
      const data = text ? JSON.parse(text) : null;

      if (!res.ok) {
        throw new Error(data?.message || data?.msg || JSON.stringify(data) || 'Verification failed');
      }

      alert('2FA enabled! Save recovery codes: ' + (data.recoveryCodes || []).join(', '));
      setShowSetup(false);
      setQrDataUrl(null);
      setSecret(null);
      setAuthCode('');
    } catch (err) {
      console.error('verify2FA error', err);
      setError(err.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowSetup(false);
    setAuthCode('');
    setQrDataUrl(null);
    setSecret(null);
    setError(null);
  };

  // Thoda left karo: wrap in a flex with justify-start and some left margin
  if (!showSetup) {
    return (
      <div className="max-w-md ml-8 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-2">Two-factor authentication</h2>
        <p className="mb-4"><b>Enable two-factor authentication and increase your account security.</b></p>
        <button
          onClick={handleEnable2FA}
          disabled={loading}
          className={`px-3 py-1 rounded text-white text-sm font-medium transition bg-blue-600 hover:bg-blue-700 ${loading ? "opacity-70" : ""}`}
        >
          {loading ? 'Please wait...' : 'Enable two-factor authentication'}
        </button>
        {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}
      </div>
    );
  }

  return (
    <div className="max-w-md ml-8 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-2">Set up two-factor authentication</h2>
      <p className="mb-5">Scan the QR or enter the manual secret into your Authenticator app.</p>
      <div className="flex gap-4 items-center">
        {qrDataUrl ? (
          <img
            src={qrDataUrl}
            alt="2fa-qr"
            width={140}
            height={140}
            className="border border-gray-200 rounded"
          />
        ) : (
          <div className="w-[140px] h-[140px] grid place-items-center border-2 border-dashed border-gray-300 rounded">
            No QR available
          </div>
        )}
        <div>
          <div className="font-semibold mb-1">Manual entry</div>
          <div className="font-mono bg-slate-100 px-2 py-[0.15rem] rounded text-sm">
            {secret || '—'}
          </div>
        </div>
      </div>
      <form onSubmit={handleNextRecovery} className="mt-7">
        <label className="block mb-1 font-medium text-sm">Authentication code</label>
        <input
          value={authCode}
          onChange={handleCodeChange}
          placeholder="6-digit code"
          maxLength={6}
          required
          className="block w-full border rounded px-3 py-2 font-mono mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={handleCancel}
            className="px-2.5 py-1 rounded border text-xs bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-3 py-1 rounded text-white text-xs font-medium 
              ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} transition`}
          >
            {loading ? 'Verifying…' : 'Verify & Save recovery codes'}
          </button>
        </div>
      </form>
      {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}
    </div>
  );
};

export default Security;
