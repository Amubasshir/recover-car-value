import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Report } from '../types/report';
import dayjs from 'dayjs' // ES 2015

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  coverPage: {
    position: 'relative',
    padding: 40,
    height: '100%',
  },
  coverBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
  },
  diagonalStripe: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(37, 150, 190)',
    transform: 'skewY(-45deg)',
    transformOrigin: 'top right',
    opacity: 0.8,
  },
  coverContent: {
    position: 'relative',
    height: '100%',
    backgroundColor: 'rgb(37, 150, 190)',
  },
  coverTitle: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: '180px',
    marginLeft: '80px',
    marginBottom: 10,
    width: '75%',
  },
  coverInfo: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clientInfo: {
    color: '#000000',
  },
  vehicleInfo: {
    color: '#ff0000',
    textAlign: 'right',
  },
  infoLabel: {
    fontSize: 14,
    color: '#ff0000',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#1a365d',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#1a365d',
  },
  methodologyText: {
    fontSize: 12,
    marginBottom: 20,
    lineHeight: 1.5,
  },
  methodologySection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 8,
  },
  table: {
    width: '100%',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1a365d',
    color: 'white',
    padding: 8,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    fontSize: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  alternateRow: {
    backgroundColor: '#f8fafc',
  },
  cell: {
    flex: 1,
  },
  vinCell: {
    flex: 1.8,
    flexWrap: 'nowrap',
    
  },
  makeModelCell: {
    flex: 1.5,
  },
  summary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f1f5f9',
  },
  summaryText: {
    fontSize: 12,
    marginBottom: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    color: '#64748b',
  },
});

interface PDFDocumentProps {
  report: Report;
}

export const PDFDocument = ({ report }: PDFDocumentProps) =>{ 
    console.log({report})
    return (
  <Document>
    <Page size="A4">
      <View style={styles.coverPage}>
        {report?.backgroundImage && (
          <Image src={"https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"} style={styles?.coverBackground} />
        )}
        <View style={styles.diagonalStripe} />
        <View style={styles.coverContent}>
          <Text style={styles.coverTitle}>Diminished Value Analysis Report</Text>
          <View style={styles.coverInfo}>
            <View style={styles.clientInfo}>
              <Text style={styles.infoLabel}>Prepared For:</Text>
              <Text style={styles.infoValue}>{report?.client_info?.name}</Text>
              <Text style={styles.infoValue}>{report?.client_info?.phone}</Text>
              <Text style={styles.infoValue}>{report?.client_info?.email}</Text>
            </View>
            <View style={styles.vehicleInfo}>
              <Text style={styles.infoLabel}>Report Date:</Text>
              <Text style={styles.infoValue}>{dayjs(report?.created_at).format('MMM DD, YYYY')}</Text>
              <Text style={styles.infoLabel}>Vehicle:</Text>
              {/* <Text style={styles.infoValue}>{report.vehicleInfo}</Text> //! have to add */}
              <Text style={styles.infoLabel}>Date of Accident:</Text>
              <Text style={styles.infoValue}>{report.accident_date}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Understanding Inherent Diminished Value</Text>
      
      <View style={styles.methodologySection}>
        <Text style={styles.methodologyText}>
          Inherent diminished value is the loss in a vehicle's market value specifically due to its accident history, even after repairs are completed. The best way to calculate Fair Market Value pre- and post-accident is through verifiable market data and accepted industry appraisal methods.
        </Text>
      </View>

      <Text style={styles.subtitle}>Methodology for Determining Diminished Value</Text>
      
      <View style={styles.methodologySection}>
        <Text style={styles.sectionTitle}>Data Collection:</Text>
        <Text style={styles.methodologyText}>
          Data is sourced from real-time active dealership listings to ensure current market accuracy.
        </Text>
      </View>

      <View style={styles.methodologySection}>
        <Text style={styles.sectionTitle}>Vehicle Matching:</Text>
        <Text style={styles.methodologyText}>
          Comparable vehicles are selected based on year, make and model, similar mileage ranges, and geographic proximity for the most reliable market comparisons.
        </Text>
      </View>

      <View style={styles.methodologySection}>
        <Text style={styles.sectionTitle}>Pre-Accident Value Determination:</Text>
        <Text style={styles.methodologyText}>
          The pre-accident value is established by calculating the average fair market value of comparable clean-title vehicles (vehicles with no accident history).
        </Text>
      </View>

      <View style={styles.methodologySection}>
        <Text style={styles.sectionTitle}>Post-Accident Value Determination:</Text>
        <Text style={styles.methodologyText}>
          The post-accident value is established by calculating the average fair market value of similar vehicles that have a reported accident history.
        </Text>
      </View>

      <View style={styles.methodologySection}>
        <Text style={styles.sectionTitle}>Diminished Value Calculation:</Text>
        <Text style={styles.methodologyText}>
          Diminished Value = Pre-Accident Value - Post-Accident Value
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>
          This report was prepared based on real-time market data and accepted valuation methods.
          Sources include AutoTrader, Cars.com, CarGurus, eBay Motors, and dealer feeds.
        </Text>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.subtitle}>Pre-Accident Comparable Listings</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Date Listed</Text>
          <Text style={styles.vinCell}>VIN</Text>
          <Text style={styles.cell}>Year</Text>
          <Text style={styles.makeModelCell}>Make/Model/Trim</Text>
          <Text style={styles.cell}>Mileage</Text>
          <Text style={styles.cell}>Zipcode</Text>
          <Text style={styles.cell}>Price</Text>
          <Text style={styles.cell}>Status</Text>
        </View>
        {report?.top_clean_listings?.map((listing, index) => (
          <View key={listing?.vin} style={[styles.tableRow, index % 2 === 1 && styles.alternateRow]}>
            <Text style={styles.cell}>{dayjs(report?.created_at).format('MMM DD, YYYY')}</Text>
            <Text style={styles.vinCell}>{listing?.vin}</Text>
            <Text style={styles.cell}>{listing?.year}</Text>
            <Text style={styles.makeModelCell}>{listing?.make + ', ' + listing?.model + ', ' + listing?.trim}</Text>
            <Text style={styles.cell}>{listing?.miles.toLocaleString()}</Text>
            <Text style={styles.cell}>{listing?.dealer_zip}</Text>
            <Text style={styles.cell}>${listing?.price.toLocaleString()}</Text>
            {/* <Text style={styles.cell}>{listing.status}</Text> */}
            <Text style={styles.cell}>Clean</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subtitle}>Post-Accident Comparable Listings</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.cell}>Date Listed</Text>
          <Text style={styles.vinCell}>VIN</Text>
          <Text style={styles.cell}>Year</Text>
          <Text style={styles.makeModelCell}>Make/Model/Trim</Text>
          <Text style={styles.cell}>Mileage</Text>
          <Text style={styles.cell}>Zipcode</Text>
          <Text style={styles.cell}>Price</Text>
          <Text style={styles.cell}>Status</Text>
        </View>
        {report?.bottom_damaged_listings?.map((listing, index) => (
          <View key={listing?.vin} style={[styles.tableRow, index % 2 === 1 && styles.alternateRow]}>
             <Text style={styles.cell}>{dayjs(report?.created_at).format('MMM DD, YYYY')}</Text>
            <Text style={styles.vinCell}>{listing?.vin}</Text>
            <Text style={styles.cell}>{listing?.year}</Text>
            <Text style={styles.makeModelCell}>{listing?.make + ', ' + listing?.model + ', ' + listing?.trim}</Text>
            <Text style={styles.cell}>{listing?.miles.toLocaleString()}</Text>
            <Text style={styles.cell}>{listing?.dealer_zip}</Text>
            <Text style={styles.cell}>${listing?.price.toLocaleString()}</Text>
            {/* <Text style={styles.cell}>{listing.status}</Text> */}
            <Text style={styles.cell}>Damaged</Text>
          </View>
        ))}
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Fair Market Value with No Accident: ${report?.average_clean_price_top5?.toFixed(2)?.toLocaleString()}
        </Text>
        <Text style={styles.summaryText}>
          Fair Market Value with Accident: ${report?.average_damaged_price_bottom5?.toFixed(2)?.toLocaleString()}
        </Text>
        <Text style={[styles.summaryText, { fontWeight: 'bold' }]}>
          Calculated Diminished Value: ${report?.estimated_diminished_value?.toFixed(2)?.toLocaleString()}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>
          This report was prepared based on real-time market data and accepted valuation methods.
          Sources include AutoTrader, Cars.com, CarGurus, eBay Motors, and dealer feeds.
        </Text>
      </View>
    </Page>
  </Document>
)};