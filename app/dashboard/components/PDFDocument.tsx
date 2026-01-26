import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import dayjs from 'dayjs'; // ES 2015
import image from '../../../public/recover-car-value.jpg';
import { Report } from '../types/report';

Font.register({
  family: 'Telegraph',
  src: `/fonts/PPTelegraf-Ultrabold.otf`,
});

Font.register({
  family: 'Garet',
  src: `/fonts/Garet-Book.ttf`,
});

const styles1 = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#000000',
  },
  methodologyText: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 12,
    color: '#000000',
    textAlign: 'justify',
  },
  bulletPoint: {
    fontSize: 11,
    marginLeft: 20,
    marginBottom: 8,
    lineHeight: 1.5,
  },
  numberedItem: {
    fontSize: 11,
    marginTop: 8,
    marginBottom: 8,
    lineHeight: 1.5,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});

const styles2 = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 60,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000000',
    textAlign: 'left',
  },
  introText: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 20,
    color: '#000000',
    textAlign: 'left',
  },
  methodologyText: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 20,
    color: '#000000',
    textAlign: 'left',
  },
  bulletHeader: {
    fontSize: 11,
    marginTop: 10,
    marginBottom: 5,
    color: '#000000',
    marginLeft: 0,
  },
  subBulletContainer: {
    marginLeft: 30,
    marginBottom: 10,
  },
  subBulletPoint: {
    fontSize: 11,
    marginBottom: 3,
    lineHeight: 1.4,
    color: '#000000',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 60,
    right: 60,
  },
  footerText: {
    fontSize: 9,
    color: '#000000',
    textAlign: 'left',
    lineHeight: 1.3,
  },
  bold: {
    fontWeight: 'bold',
  },
});

const styles3 = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 15,
    color: '#000000',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 8,
    color: '#000000',
  },
  methodologyText: {
    fontSize: 11,
    lineHeight: 1.5,
    marginBottom: 10,
    color: '#000000',
    textAlign: 'justify',
  },
  bulletPoint: {
    fontSize: 11,
    marginLeft: 20,
    marginBottom: 5,
    lineHeight: 1.4,
  },
  numberedItem: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginTop: 20,
    marginBottom: 20,
  },
  legalSection: {
    marginTop: 30,
  },
  caseTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 5,
  },
  caseText: {
    fontSize: 11,
    marginLeft: 20,
    marginBottom: 10,
    lineHeight: 1.4,
  },
  conclusion: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  conclusionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footer: {
    fontSize: 9,
    color: '#000000',
    textAlign: 'left',
    lineHeight: 1.3,
    marginTop: 20,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});


const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Garet', // Garet font for body text as requested
  },

  //! v2
  coverPage: {
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  // Main diagonal blue background
  mainBackground: {
    position: 'absolute',
    top: -50,
    left: 0,
    right: 0,
    height: '120%',
    background:
      'linear-gradient(135deg, #1e3a8a 0%, #1e40af 30%, #3b82f6 60%, #60a5fa 100%)',
    transform: 'skewY(-0deg)',
    transformOrigin: 'top left',
  },
  // Car image overlay
  coverBackground: {
    position: 'absolute',
    top: -220,
    left: -0.5,
    right: 0,
    height: '120%',
    opacity: 1,
    transform: 'skewY(8deg)', // 0deg
    transformOrigin: 'top left',
  },
  //   coverBackgroundColor: {
  //     position: "absolute",
  //     top: -220,
  //     left: -0.5,
  //     right: 0,
  //     height: "120%",
  //     opacity: 1,
  //     transform: "skewY(0deg)",
  //     transformOrigin: "top left",
  //     backgroundColor: "#142445bd",
  //   },
  // Blue diagonal stripe at top
  blueOverlayStripe: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    width: '100%',
    height: 525,
    // backgroundColor: "#142445bd",
    backgroundColor: '#21597aa3',
    transform: 'skewY(-17deg)',
    transformOrigin: 'top left',
  },
  // Blue diagonal stripe at top
  blueStripe: {
    position: 'absolute',
    top: -48,
    left: -50,
    width: '100%',
    height: 180,
    backgroundColor: '#142445',
    transform: 'skewY(-17deg)',
    transformOrigin: 'top left',
  },
  // Red diagonal stripe at top
  redStripe: {
    position: 'absolute',
    top: 100,
    left: 50,
    width: '100%',
    height: 20,
    backgroundColor: '#ef4444',
    transform: 'skewY(-17deg)',
    transformOrigin: 'top left',
  },
  // White bottom section
  whiteBottomSection: {
    position: 'absolute',
    bottom: -220,
    left: -3,
    right: -3,
    width: '105%',
    height: 400,
    backgroundColor: '#ffffff',
    transform: 'skewY(-17deg)',
    transformOrigin: 'bottom left',
  },
  // Red diagonal element at bottom left
  redBottomElement: {
    position: 'absolute',
    bottom: -10,
    left: -80,
    width: 260,
    height: 80,
    backgroundColor: '#ef4444',
    transform: 'skewY(27deg)',
    transformOrigin: 'bottom left',
  },
  coverTitle: {
    position: 'absolute',
    fontSize: 64,
    fontWeight: 'bold',
    fontFamily: 'Telegraph', // Telegraph font for heading as requested
    color: '#ffffff',
    top: 180,
    left: 60,
    width: 400,
    lineHeight: 1.1,
  },
  // Report Date section
  reportDateContainer: {
    position: 'absolute',
    top: 560,
    textAlign: 'right',
    right: 40,
  },
  reportDateLabel: {
    fontSize: 18,
    color: '#ef4444',
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'right',
  },
  reportDateValue: {
    fontSize: 18,
    color: '#374151',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  // Prepared For section
  preparedForContainer: {
    position: 'absolute',
    bottom: 70,
    left: 40,
  },
  preparedForLabel: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  clientName: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  clientContact: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2,
  },
  // Vehicle section
  vehicleContainer: {
    position: 'absolute',
    bottom: 70,
    right: 40,
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  vehicleLabel: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  vehicleValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'right',
  },
  accidentDateLabel: {
    fontSize: 14,
    color: '#ef4444',
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'right',
  },
  accidentDateValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: 'bold',
    textAlign: 'right',
  },

  //   page 1 end

  title: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: 'bold',
    fontFamily: 'Telegraph', // Telegraph font for heading as requested
    color: '#1a365d',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    fontWeight: 'bold',
    fontFamily: 'Telegraph', // Telegraph font for heading as requested
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
    fontFamily: 'Telegraph', // Telegraph font for heading as requested
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
    fontSize: 9,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    fontSize: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  alternateRow: {
    backgroundColor: '#f8fafc',
  },
  cell: {
    flex: 0.9,
    textAlign: 'center',
  },
  vinCell: {
    flex: 2,
    flexWrap: 'nowrap',
    textAlign: 'center',
  },
  makeModelCell: {
    flex: 1.5,
    textAlign: 'center',
  },
  summary: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f1f5f9',
    textAlign: 'center',
  },
  summaryText: {
    fontSize: 12,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    color: '#64748b',
    textAlign: 'center',
  },
});
interface PDFDocumentProps {
  report: Report;
  topListChartImage?: string;
  bottomListChartImage?: string;
}

export const PDFDocument = ({
  report,
  topListChartImage,
  bottomListChartImage,
}: PDFDocumentProps) => {
  //   console.log({ report });
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.coverPage}>
          {/* Main diagonal blue background */}
          <View style={styles.mainBackground} />

          {/* Car image overlay */}
          <Image src={image.src} style={styles.coverBackground} />

          {/* Red diagonal stripe at top */}
          <View style={styles.blueOverlayStripe} />
          <View style={styles.blueStripe} />
          <View style={styles.redStripe} />

          {/* White bottom section */}
          <View style={styles.whiteBottomSection} />

          {/* Red diagonal element at bottom left */}
          <View style={styles.redBottomElement} />

          {/* Main title */}
          {report?.selected_method === "total_loss" ? <Text style={styles.coverTitle}>
            Total Loss{'\n'}
            Analysis{'\n'}
            Report
          </Text> :
          <Text style={styles.coverTitle}>
            Diminished{'\n'}Value{'\n'}Analysis{'\n'}Report
          </Text>}

          {/* Report Date */}
          <View style={styles.reportDateContainer}>
            <Text style={styles.reportDateLabel}>Report Date:</Text>
            <Text style={styles.reportDateValue}>
              {dayjs(report?.created_at).format('MMM DD, YYYY')}
            </Text>
          </View>

          {/* Prepared For section */}
          <View style={styles.preparedForContainer}>
            <Text style={styles.preparedForLabel}>Prepared For:</Text>
            <Text style={styles.clientName}>{report?.client_info?.name}</Text>
            <Text style={styles.clientContact}>
              {report?.client_info?.phone}
            </Text>
            <Text style={styles.clientContact}>
              {report?.client_info?.email}
            </Text>
          </View>

          {/* Vehicle section */}
          <View style={styles.vehicleContainer}>
            <Text style={styles.vehicleLabel}>Vehicle:</Text>
            <Text style={styles.vehicleValue}>
              {report?.heading ||
                report?.year +
                  ' ' +
                  report?.make +
                  ' ' +
                  report?.model +
                  ' ' +
                  report?.trim}
            </Text>
            <Text style={styles.accidentDateLabel}>Date of Accident:</Text>
            <Text style={styles.accidentDateValue}>
              {dayjs(report?.accident_date).format('MMM DD, YYYY')}
            </Text>
          </View>
        </View>
      </Page>

     {/* Page 1 - Valuation Methodology Overview */}
    <Page size="A4" style={styles1.page}>
      <Text style={styles1.title}>Valuation Methodology</Text>
      
      <Text style={styles1.subtitle}>Inherent Diminished Value Framework</Text>
      
      <Text style={styles1.methodologyText}>
        MarketVerify determines the inherent diminished value of a vehicle based on real-market data obtained from verified dealer listings across multiple data sources. The methodology compares pre-accident and post-accident market values for substantially similar vehicles within the same year, make, model, and trim, adjusted for mileage.
      </Text>
      
      <Text style={styles1.methodologyText}>
        When sufficient comparable listings exist, MarketVerify uses regression-based analysis to calculate a precise diminished value amount. This approach aligns with standard valuation practices recognized in automotive appraisal, underwriting, and litigation.
      </Text>
      
      <Text style={styles1.subtitle}>Fair Market Value Methodology (Court-Defensible)</Text>
      
      <Text style={styles1.methodologyText}>
        MarketVerify's approach to vehicle valuation is based on the Fair Market Value (FMV) standard commonly referenced in insurance law and accepted by U.S. courts:
      </Text>
      
      <Text style={styles1.methodologyText}>
        <Text style={styles1.italic}>"Fair Market Value"</Text> is the price a willing buyer would pay and a willing seller would accept in an open and competitive market, neither being under compulsion to act and both having reasonable knowledge of relevant facts.
      </Text>
      
      <Text style={styles1.sectionTitle}>Key Principles Applied:</Text>
      
      <Text style={styles1.numberedItem}>
        <Text style={styles1.bold}>1. Market-Verified Data Sources:</Text> Values are derived from verified third-party dealer listings representing actual market transactions, not theoretical book values.
      </Text>
      
      <Text style={styles1.numberedItem}>
        <Text style={styles1.bold}>2. Comparability:</Text> Comparable vehicles are selected based on year, make, model, trim, and mileage, ensuring like-kind comparison.
      </Text>
      
      <Text style={styles1.numberedItem}>
        <Text style={styles1.bold}>3. Empirical Analysis:</Text> A linear regression statistical model is used to isolate the value impact attributable solely to accident history. In instances where the comparable vehicles fall within a narrow mileage range and the data does not show a statistically meaningful mileage adjustment, MarketVerify applies a "flat-line" fallback—"Within this narrow mileage range, market data does not show a statistically meaningful mileage adjustment, so we treat clean vehicles as having essentially the same value." This prevents overstating or understating mileage effects when the market signal is weak or non-directional.
      </Text>
      
      <Text style={styles1.numberedItem}>
        <Text style={styles1.bold}>4. Data-Limited Fallbacks and Conservative Defaults:</Text> In some markets, there are too few qualified post-accident comparables to estimate a stable, data-driven discount. When the available accident-flagged listings do not meet MarketVerify's minimum data sufficiency thresholds, a conservative fallback is applied: the post-accident fair market value is set at 90% of the pre-accident fair market value, reflecting a 10% inherent diminution in value for vehicles with material accident history. This default is used only when direct post-accident market evidence is inadequate and is intended as a conservative benchmark rather than a maximum; where sufficient post-accident market data exist, those data always control.
      </Text>
      
      <Text style={styles1.numberedItem}>
        <Text style={styles1.bold}>5. Transparency and Replicability:</Text> All data inputs, selection thresholds, and applied percentages are stored and auditable, supporting testimony and independent verification if challenged.
      </Text>
      
      <Text style={styles1.numberedItem}>
        <Text style={styles1.bold}>6. Conformity with Professional Standards:</Text> Methodology is consistent with the principles of Uniform Standards of Professional Appraisal Practice (USPAP) and recognized valuation procedures used in automotive finance and litigation.
      </Text>
      
      <Text style={styles1.sectionTitle}>Result:</Text>
      
      <Text style={styles1.methodologyText}>
        This process yields a court-defensible fair market value and diminished value amount supported by observable market data and recognized statistical methods. MarketVerify's analysis can be replicated, peer-reviewed, and cross-verified against industry valuation references, making it suitable for expert reports, demand letters, and evidentiary submission.
      </Text>
    </Page>

    {/* Page 2 - Fair Market Value Methodology Details */}
    <Page size="A4" style={styles2.page}>
      <Text style={styles2.title}>
        Fair Market Value Methodology (Court-Defensible)
      </Text>

      <Text style={styles2.introText}>
        To calculate FMV, we use a structured, data-driven method grounded in{' '}
        <Text style={styles2.bold}>
          industry practices and statistical reliability
        </Text>
        :
      </Text>

      <Text style={styles2.bulletHeader}>• Market Data Collection</Text>

      <View style={styles2.subBulletContainer}>
        <Text style={styles2.subBulletPoint}>
          • Pulled publicly listed sales of comparable vehicles from trusted marketplaces (e.g., Cars.com, AutoTrader, CarFax, and dealer feeds).
        </Text>
        <Text style={styles2.subBulletPoint}>
          • Filtered for year, make, model, and trim to ensure true comparability.
        </Text>
      </View>

      <Text style={styles2.bulletHeader}>• Linear Regression Analysis</Text>

      <View style={styles2.subBulletContainer}>
        <Text style={styles2.subBulletPoint}>
          • Plotted price vs. mileage to establish a market-based depreciation curve.
        </Text>
        <Text style={styles2.subBulletPoint}>
          • Applied linear regression to create a statistically valid trendline.
        </Text>
        <Text style={styles2.subBulletPoint}>
          • Interpolated the subject vehicle's value based on actual mileage.
        </Text>
      </View>

      <Text style={styles2.bulletHeader}>• Outlier Filtering</Text>

      <View style={styles2.subBulletContainer}>
        <Text style={styles2.subBulletPoint}>
          • Excluded listings beyond ±2 standard deviations from the mean to improve accuracy.
        </Text>
      </View>

      <View style={styles2.footer}>
        <Text style={styles2.footerText}>
          This report was prepared based on real-time market data and accepted valuation methods. Sources include AutoTrader, Cars.com, CarGurus, eBay Motors, and dealer feeds.
        </Text>
      </View>
    </Page>

    {/* Page 3 - Legal Validity */}
    <Page size="A4" style={styles3.page}>
      <Text style={styles3.title}>Legal Validity</Text>

      <Text style={styles3.methodologyText}>
        This methodology complies with the{' '}
        <Text style={styles3.bold}>Daubert standard</Text> (
        <Text style={styles3.italic}>
          Daubert v. Merrell Dow Pharm., Inc.
        </Text>
        , 509 U.S. 579 (1993)) requiring expert methods to be:
      </Text>

      <View style={{ marginLeft: 20, marginBottom: 16 }}>
        <Text style={styles3.bulletPoint}>
          • <Text>Testable</Text>
        </Text>
        <Text style={styles3.bulletPoint}>
          • <Text>Peer Reviewed</Text>
        </Text>
        <Text style={styles3.bulletPoint}>
          • <Text>Reliable</Text>
        </Text>
        <Text style={styles3.bulletPoint}>
          • <Text>Accepted in the field</Text>
        </Text>
      </View>

      <Text style={styles3.methodologyText}>
        Florida case law acknowledges diminished value as a legitimate component of vehicle damage and the legal framework supports current case laws' application as a method to quantify such losses. Utilizing market regression models is an effective approach to demonstrate the financial impact of diminished value in vehicle claims.
      </Text>

      <Text style={styles3.caseTitle}>Siegle v. Progressive</Text>
      <Text style={styles3.caseText}>
        Consumers Ins. Co., 819 So. 2d 732 (Fla. 2002).
      </Text>

      <Text style={styles3.caseTitle}>
        <Text style={styles3.italic}>McHale v. Farm Bureau Mutual</Text>
      </Text>
      <Text style={styles3.caseText}>
        Insurance Co., 409 So. 2d 238 (Fla. 3d DCA 1982).
      </Text>

      <View style={styles3.divider} />

      <Text style={styles3.methodologyText}>
        Conclusion: This valuation method is{' '}
        <Text style={styles3.bold}>
          transparent, repeatable, and accepted by courts and insurers
        </Text>{' '}
        for determining fair market value and inherent diminished value
      </Text>

      <View style={styles3.divider} />

      <Text style={styles3.sectionTitle}>Case Law Support</Text>

      <Text style={styles3.bulletPoint}>
        • <Text style={styles3.bold}>McHale v. State Farm</Text> (M.D. Fla. 2017): Inherent diminished value upheld via market regression model.
      </Text>

      <Text style={styles3.bulletPoint}>
        • <Text style={styles3.bold}>Douglas v. Allstate</Text> (E.D. Mo. 2009): Regression analysis based on listings deemed admissible under Daubert.
      </Text>

      <Text style={styles3.bulletPoint}>
        • <Text style={styles3.bold}>Chaudhary v. USAA</Text> (S.D. Tex. 2022): Listing-based valuation accepted as reliable and independently verifiable.
      </Text>

      <View style={styles3.divider} />

      <Text style={styles3.footer}>
        This report was prepared based on real-time market data and accepted valuation methods. Sources include AutoTrader, Cars.com, CarGurus, eBay Motors, and dealer feeds.
      </Text>
    </Page>

    
      <Page size="A4" style={styles.page}>
        <Text style={styles.subtitle}>Pre-Accident Comparable Listings</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>Date Listed</Text>
            <Text style={styles.vinCell}>VIN</Text>
            <Text style={styles.cell}>Year</Text>
            <Text style={styles.makeModelCell}>Make/Model</Text>
            <Text style={styles.cell}>Mileage</Text>
            <Text style={styles.cell}>Zipcode</Text>
            <Text style={styles.cell}>Price</Text>
            <Text style={styles.cell}>Status</Text>
          </View>
          {report?.top_clean_listings?.map((listing, index) => (
            <View
              key={listing?.vin}
              style={[styles.tableRow, index % 2 === 1 && styles.alternateRow]}
            >
              <Text style={styles.cell}>
                {dayjs(listing?.first_seen_at_source_date).format(
                  'MMM DD, YYYY'
                )}
              </Text>
              <Text style={styles.vinCell}>{listing?.vin}</Text>
              <Text style={styles.cell}>{listing?.year}</Text>
              <Text style={styles.makeModelCell}>
                {listing?.make + ', ' + listing?.model}
              </Text>
              <Text style={styles.cell}>
                {listing?.mileage?.toLocaleString()}
              </Text>
              <Text style={styles.cell}>{listing?.dealer_zip}</Text>
              <Text style={styles.cell}>
                ${listing?.price?.toLocaleString()}
              </Text>
              <Text style={styles.cell}>Clean</Text>
            </View>
          ))}

          <View
            style={{
              height: 'auto',
              width: '100%',
              border: '1px solid #e2e8f0',
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <Image
              src={topListChartImage}
              style={{ width: '100%', height: 'auto' }}
            />
          </View>
        </View>


        <View style={styles.footer}>

        {report?.selected_method === "total_loss" && <View style={styles.summary}>
          <Text
            style={[
              styles.summaryText,
              {
                fontWeight: 'bold',
                fontFamily: 'Telegraph',
                fontSize: 18,
                marginTop: 5,
                marginBottom: 0,
              },
            ]}
          >
            Fair Market Value: $
            {Number(report?.average_clean_price_top5)
              ?.toFixed(0)
              ?.toLocaleString()}
            {/* {report?.estimated_diminished_value} */}
          </Text>
        </View>}


          <Text>
            This report was prepared based on real-time market data and accepted
            valuation methods. Sources include AutoTrader, Cars.com, CarGurus,
            eBay Motors, and dealer feeds.
          </Text>
        </View>
      </Page>

      {report?.selected_method !== "total_loss" && <Page size="A4" style={styles.page}>
        <Text style={styles.subtitle}>Post-Accident Comparable Listings</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.cell}>Date Listed</Text>
            <Text style={styles.vinCell}>VIN</Text>
            <Text style={styles.cell}>Year</Text>
            <Text style={styles.makeModelCell}>Make/Model</Text>
            <Text style={styles.cell}>Mileage</Text>
            <Text style={styles.cell}>Zipcode</Text>
            <Text style={styles.cell}>Price</Text>
            <Text style={styles.cell}>Status</Text>
          </View>
          {report?.bottom_damaged_listings?.map((listing, index) => (
            <View
              key={listing?.vin}
              style={[styles.tableRow, index % 2 === 1 && styles.alternateRow]}
            >
              <Text style={styles.cell}>
                {dayjs(listing?.first_seen_at_source_date).format(
                  'MMM DD, YYYY'
                )}
              </Text>
              <Text style={styles.vinCell}>{listing?.vin}</Text>
              <Text style={styles.cell}>{listing?.year}</Text>
              <Text style={styles.makeModelCell}>
                {listing?.make + ', ' + listing?.model}
              </Text>
              <Text style={styles.cell}>
                {listing?.mileage?.toLocaleString()}
              </Text>
              <Text style={styles.cell}>{listing?.dealer_zip}</Text>
              <Text style={styles.cell}>
                ${listing?.price?.toLocaleString()}
              </Text>
              {/* <Text style={styles.cell}>{listing.status}</Text> */}
              <Text style={styles.cell}>Damaged</Text>
            </View>
          ))}

          <View
            style={{
              height: 'auto',
              width: '100%',
              border: '1px solid #e2e8f0',
              marginTop: 30,
              marginBottom: 20,
            }}
          >
            <Image
              src={bottomListChartImage}
              style={{ width: '100%', height: 'auto' }}
            />
          </View>
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Fair Market Value with No Accident: $
            {Number(report?.average_clean_price_top5)
              ?.toFixed(0)
              ?.toLocaleString()}
            {/* {report?.average_clean_price_top5} */}
          </Text>
          <Text style={styles.summaryText}>
            Fair Market Value with Accident: $
            {Number(report?.average_damaged_price_bottom5)
              ?.toFixed(0)
              ?.toLocaleString()}
            {/* {report?.average_damaged_price_bottom5} */}
          </Text>
          <Text
            style={[
              styles.summaryText,
              {
                fontWeight: 'bold',
                fontFamily: 'Telegraph',
                fontSize: 14,
                marginTop: 10,
              },
            ]}
          >
            Calculated Diminished Value: $
            {Number(report?.estimated_diminished_value)
              ?.toFixed(0)
              ?.toLocaleString()}
            {/* {report?.estimated_diminished_value} */}
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>
            This report was prepared based on real-time market data and accepted
            valuation methods. Sources include AutoTrader, Cars.com, CarGurus,
            eBay Motors, and dealer feeds.
          </Text>
        </View>
      </Page>}
    </Document>
  );
};
