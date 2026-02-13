'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Welcome back{session?.user?.name ? `, ${session.user.name}` : ''}</h1>
      <p className="text-gray-600 mb-8">Here's your HOS Pilot - AI Truck Driver Schedule & Compliance overview.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 border rounded-lg bg-blue-50">
          <p className="text-sm text-gray-600">Status</p>
          <p className="text-2xl font-bold text-blue-600">Active</p>
        </div>
        <div className="p-4 border rounded-lg bg-green-50">
          <p className="text-sm text-gray-600">Plan</p>
          <p className="text-2xl font-bold text-green-600">Free</p>
        </div>
        <div className="p-4 border rounded-lg bg-purple-50">
          <p className="text-sm text-gray-600">Since</p>
          <p className="text-2xl font-bold text-purple-600">{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-4">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
          <a href="/dashboard/drivers" className="block p-4 border rounded-lg hover:bg-blue-50 transition">
            <h3 className="font-medium">Driver Management</h3>
            <p className="text-sm text-gray-500">View, create, and manage driver profiles</p>
          </a>
          <a href="/dashboard/logs" className="block p-4 border rounded-lg hover:bg-blue-50 transition">
            <h3 className="font-medium">Driving Logs</h3>
            <p className="text-sm text-gray-500">Detailed HOS tracking and compliance reporting</p>
          </a>
          <a href="/dashboard/fleet" className="block p-4 border rounded-lg hover:bg-blue-50 transition">
            <h3 className="font-medium">Fleet Management</h3>
            <p className="text-sm text-gray-500">Track vehicles and current driver assignments</p>
          </a>
        <a href="/dashboard/settings" className="block p-4 border rounded-lg hover:bg-blue-50 transition">
          <h3 className="font-medium">Settings</h3>
          <p className="text-sm text-gray-500">Manage your account preferences</p>
        </a>
      </div>
    </div>
  );
}
