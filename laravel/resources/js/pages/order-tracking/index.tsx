import GuestLayout from "@/layouts/guest-layout";
import React, { useState, useEffect } from "react";

// ---------------- SAMPLE DATA ----------------
const ordersData = [
    {
        id: 1,
        tracking: "PT2025001",
        sender: "John Smith",
        senderPhone: "+1 (555) 123-4567",
        recipient: "Alice Johnson",
        recipientPhone: "+1 (555) 987-6543",
        recipientAddress: "123 Main St, New York, NY 10001",
        status: "delivered",
        rider: "Mike Johnson",
        branch: "main",
        service: "express",
        estimatedDelivery: "2025-01-21",
        actualDelivery: "2025-01-21 14:30",
        priority: ["insured"],
        timeline: [
            {
                status: "Order Created",
                timestamp: "2025-01-20 09:00",
                location: "Main Branch",
                notes: "Order received and processed",
            },
            {
                status: "Picked Up",
                timestamp: "2025-01-20 11:30",
                location: "Sender Location",
                notes: "Package collected from sender",
            },
            {
                status: "In Transit",
                timestamp: "2025-01-20 15:45",
                location: "Distribution Center",
                notes: "Package sorted and dispatched",
            },
            {
                status: "Out for Delivery",
                timestamp: "2025-01-21 08:00",
                location: "Local Hub",
                notes: "Assigned to delivery rider",
            },
            {
                status: "Delivered",
                timestamp: "2025-01-21 14:30",
                location: "Recipient Address",
                notes: "Successfully delivered to recipient",
            },
        ],
    },
    // ... rest of your orders
];

const statusConfig: Record<
    string,
    { badge: string; color: string; icon: string }
> = {
    pending: {
        badge: "badge badge-warning",
        color: "text-warning-600 bg-warning-50",
        icon: "fas fa-clock",
    },
    "picked-up": {
        badge: "badge",
        color: "text-primary-600 bg-primary-50",
        icon: "fas fa-box",
    },
    "in-transit": {
        badge: "badge",
        color: "text-accent-600 bg-accent-50",
        icon: "fas fa-truck",
    },
    "out-for-delivery": {
        badge: "badge",
        color: "text-accent-600 bg-accent-50",
        icon: "fas fa-shipping-fast",
    },
    delivered: {
        badge: "badge badge-success",
        color: "text-success-600 bg-success-50",
        icon: "fas fa-check-circle",
    },
    "failed-delivery": {
        badge: "badge badge-error",
        color: "text-error-600 bg-error-50",
        icon: "fas fa-exclamation-triangle",
    },
    returned: {
        badge: "badge badge-error",
        color: "text-error-600 bg-error-50",
        icon: "fas fa-undo",
    },
};

// ---------------- COMPONENT ----------------
const OrderTracking: React.FC = () => {
    const [orders, setOrders] = useState(ordersData);
    const [filteredOrders, setFilteredOrders] = useState(ordersData);
    const [selectedOrders, setSelectedOrders] = useState<Set<number>>(new Set());
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [trackingModal, setTrackingModal] = useState<any | null>(null);

    // ---------------- PAGINATION ----------------
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedOrders = filteredOrders.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    // ---------------- SELECTION ----------------
    const toggleOrderSelection = (id: number) => {
        const newSet = new Set(selectedOrders);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setSelectedOrders(newSet);
    };

    const toggleSelectAll = () => {
        if (selectedOrders.size === paginatedOrders.length) {
            setSelectedOrders(new Set());
        } else {
            setSelectedOrders(new Set(paginatedOrders.map((o) => o.id)));
        }
    };

    // ---------------- SORT ----------------
    const sortTable = (column: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortColumn === column) {
            direction = sortDirection === "asc" ? "desc" : "asc";
        }
        setSortColumn(column);
        setSortDirection(direction);

        const sorted = [...filteredOrders].sort((a: any, b: any) => {
            let aValue = a[column];
            let bValue = b[column];
            if (typeof aValue === "string") {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }
            return direction === "asc"
                ? aValue > bValue
                    ? 1
                    : -1
                : aValue < bValue
                    ? 1
                    : -1;
        });
        setFilteredOrders(sorted);
    };

    // ---------------- TRACKING MODAL ----------------
    const openTrackingModal = (tracking: string) => {
        const order = orders.find((o) => o.tracking === tracking);
        if (order) setTrackingModal(order);
    };
    const closeTrackingModal = () => setTrackingModal(null);

    // ---------------- RENDER ----------------
    return (
        <GuestLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="mb-8">
                    <h2 className="text-3xl font-semibold text-text-primary">Order Tracking & Status Management</h2>
                    <p className="mt-2 text-text-secondary">Monitor and update parcel delivery status across the entire logistics network</p>
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <aside className="lg:col-span-3">
                        <div className="card sticky top-24">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-text-primary">Advanced Filters</h3>
                                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium" onclick="clearAllFilters()">
                                    <i className="fas fa-times mr-1"></i>Clear All
                                </button>
                            </div>

                            <div className="space-y-6">

                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">Order Status</label>
                                    <select className="form-input text-sm" id="statusFilter" onchange="applyFilters()">
                                        <option value>All Status</option>
                                        <option value="pending">Pending Pickup</option>
                                        <option value="picked-up">Picked Up</option>
                                        <option value="in-transit">In Transit</option>
                                        <option value="out-for-delivery">Out for Delivery</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="failed-delivery">Failed Delivery</option>
                                        <option value="returned">Returned</option>
                                    </select>
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">Date Range</label>
                                    <div className="space-y-2">
                                        <input type="date" className="form-input text-sm" id="startDate" onchange="applyFilters()" />
                                        <input type="date" className="form-input text-sm" id="endDate" onchange="applyFilters()" />
                                    </div>
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">Branch</label>
                                    <select className="form-input text-sm" id="branchFilter" onchange="applyFilters()">
                                        <option value>All Branches</option>
                                        <option value="main">Main Branch</option>
                                        <option value="north">North Branch</option>
                                        <option value="south">South Branch</option>
                                        <option value="east">East Branch</option>
                                        <option value="west">West Branch</option>
                                    </select>
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">Assigned Rider</label>
                                    <select className="form-input text-sm" id="riderFilter" onchange="applyFilters()">
                                        <option value>All Riders</option>
                                        <option value="mike-johnson">Mike Johnson</option>
                                        <option value="sarah-davis">Sarah Davis</option>
                                        <option value="alex-chen">Alex Chen</option>
                                        <option value="emma-wilson">Emma Wilson</option>
                                        <option value="david-brown">David Brown</option>
                                    </select>
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">Service Type</label>
                                    <select className="form-input text-sm" id="serviceFilter" onchange="applyFilters()">
                                        <option value>All Services</option>
                                        <option value="standard">Standard Delivery</option>
                                        <option value="express">Express Delivery</option>
                                        <option value="overnight">Overnight Delivery</option>
                                        <option value="same-day">Same Day Delivery</option>
                                    </select>
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-text-primary mb-2">Priority Level</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500 mr-2" value="high" onchange="applyFilters()" />
                                            <span className="text-sm text-text-primary">High Priority</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500 mr-2" value="fragile" onchange="applyFilters()" />
                                            <span className="text-sm text-text-primary">Fragile Items</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500 mr-2" value="insured" onchange="applyFilters()" />
                                            <span className="text-sm text-text-primary">Insured</span>
                                        </label>
                                    </div>
                                </div>
                            </div>


                            <div className="mt-6 pt-6 border-t border-secondary-200">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-secondary-600">Active Filters:</span>
                                    <span className="font-medium text-text-primary" id="activeFiltersCount">0</span>
                                </div>
                                <div className="mt-2 flex flex-wrap gap-1" id="activeFilterTags">

                                </div>
                            </div>
                        </div>
                    </aside>


                    <section className="lg:col-span-9">
                        <div className="card">

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-text-primary">Order Tracking Results</h3>
                                    <p className="text-sm text-secondary-600 mt-1" id="resultsCount">Showing 247 orders</p>
                                </div>
                                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                                    <button className="btn-secondary text-sm" onclick="exportResults()">
                                        <i className="fas fa-download mr-2"></i>Export CSV
                                    </button>
                                    <button className="btn-secondary text-sm" onclick="refreshData()">
                                        <i className="fas fa-refresh mr-2"></i>Refresh
                                    </button>
                                    <button className="btn-primary text-sm" onclick="bulkStatusUpdate()">
                                        <i className="fas fa-edit mr-2"></i>Bulk Update
                                    </button>
                                </div>
                            </div>


                            <div id="bulkActionsBar" className="hidden bg-primary-50 border border-primary-200 rounded-md p-4 mb-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm font-medium text-primary-700" id="selectedCount">0 orders selected</span>
                                        <select className="form-input text-sm w-auto min-w-0" id="bulkStatusSelect">
                                            <option value>Update Status</option>
                                            <option value="picked-up">Mark as Picked Up</option>
                                            <option value="in-transit">Mark as In Transit</option>
                                            <option value="out-for-delivery">Mark as Out for Delivery</option>
                                            <option value="delivered">Mark as Delivered</option>
                                            <option value="failed-delivery">Mark as Failed Delivery</option>
                                        </select>
                                        <button className="btn-primary text-sm" onclick="applyBulkUpdate()">Apply</button>
                                    </div>
                                    <button className="text-secondary-600 hover:text-secondary-700" onclick="clearSelection()">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>


                            <div className="hidden lg:block overflow-x-auto">
                                <table className="min-w-full divide-y divide-secondary-200">
                                    <thead className="bg-secondary-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                                                <input type="checkbox" className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500" id="selectAllOrders" onchange="toggleSelectAll()" />
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer hover:text-primary-600" onclick="sortTable('tracking')">
                                                Tracking # <i className="fas fa-sort ml-1"></i>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer hover:text-primary-600" onclick="sortTable('sender')">
                                                Sender <i className="fas fa-sort ml-1"></i>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer hover:text-primary-600" onclick="sortTable('recipient')">
                                                Recipient <i className="fas fa-sort ml-1"></i>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer hover:text-primary-600" onclick="sortTable('status')">
                                                Status <i className="fas fa-sort ml-1"></i>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer hover:text-primary-600" onclick="sortTable('rider')">
                                                Assigned Rider <i className="fas fa-sort ml-1"></i>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider cursor-pointer hover:text-primary-600" onclick="sortTable('delivery')">
                                                Est. Delivery <i className="fas fa-sort ml-1"></i>
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-surface divide-y divide-secondary-200" id="ordersTableBody">

                                    </tbody>
                                </table>
                            </div>


                            <div className="hidden md:block lg:hidden">
                                <div className="space-y-4" id="tabletOrderCards">

                                </div>
                            </div>


                            <div className="md:hidden space-y-4" id="mobileOrderCards">

                            </div>


                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-secondary-200">
                                <div className="text-sm text-secondary-600">
                                    Showing <span className="font-medium" id="showingStart">1</span> to <span className="font-medium" id="showingEnd">10</span> of <span className="font-medium" id="totalResults">247</span> results
                                </div>
                                <div className="flex items-center space-x-2">
                                    <button className="btn-secondary text-sm" id="prevPage" onclick="changePage(-1)">Previous</button>
                                    <div className="flex space-x-1" id="pageNumbers">

                                    </div>
                                    <button className="btn-secondary text-sm" id="nextPage" onclick="changePage(1)">Next</button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            {/* Tracking Modal */}
            {trackingModal && (
                <div id="trackingModal" className="fixed inset-0 z-50 hidden overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity bg-secondary-500 bg-opacity-75" onClick={closeTrackingModal}>Close</div>

                        <div className="inline-block w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-surface shadow-xl rounded-lg">

                            <div className="flex items-center justify-between px-6 py-4 border-b border-secondary-200">
                                <div>
                                    <h3 className="text-lg font-semibold text-text-primary" id="modalTrackingNumber">Order Tracking Timeline</h3>
                                    <p className="text-sm text-secondary-600" id="modalOrderInfo">Loading order information...</p>
                                </div>
                                <button className="text-secondary-400 hover:text-secondary-600 touch-target" onClick={closeTrackingModal}>
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>


                            <div className="px-6 py-6">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                                    <div className="lg:col-span-1">
                                        <div className="card bg-secondary-50">
                                            <h4 className="font-semibold text-text-primary mb-4">Order Summary</h4>
                                            <div className="space-y-3" id="orderSummary">

                                            </div>
                                        </div>

                                        <div className="card mt-6">
                                            <h4 className="font-semibold text-text-primary mb-4">Update Status</h4>
                                            <div className="space-y-4">
                                                <select className="form-input text-sm" id="newStatusSelect">
                                                    <option value="">Select New Status</option>
                                                    <option value="picked-up">Picked Up</option>
                                                    <option value="in-transit">In Transit</option>
                                                    <option value="out-for-delivery">Out for Delivery</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="failed-delivery">Failed Delivery</option>
                                                    <option value="returned">Returned</option>
                                                </select>
                                                <textarea className="form-input text-sm" rows={3} placeholder="Add notes or reason for status change..." id="statusNotes"></textarea>
                                                <button className="btn-primary w-full">
                                                    {/* onClick={updateOrderStatus}> */}
                                                    <i className="fas fa-save mr-2"></i>Update Status
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="lg:col-span-2">
                                        <h4 className="font-semibold text-text-primary mb-6">Tracking Timeline</h4>
                                        <div className="relative" id="trackingTimeline">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </GuestLayout>
    );
};

export default OrderTracking;
