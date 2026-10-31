export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalCustomers: number;
  totalProducts: number;
  conversionRate: number;
  avgOrderValue: number;
}

export const dashboardStats: DashboardStats = {
  totalSales: 1245075,
  totalOrders: 342,
  totalCustomers: 89,
  totalProducts: 124,
  conversionRate: 3.4,
  avgOrderValue: 3640,
};
