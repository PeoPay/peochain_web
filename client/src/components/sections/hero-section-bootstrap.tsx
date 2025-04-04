import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowRight, ShieldCheck, BarChart3 } from "lucide-react";

interface HeroSectionProps {
  onExploreClick: () => void;
  onJoinClick: () => void;
}

export default function HeroSectionBootstrap({ onExploreClick, onJoinClick }: HeroSectionProps) {
  return (
    <section className="py-5 py-md-6 mt-4 mt-md-5">
      <Container className="px-3 px-md-4">
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <h1 className="fw-bold display-5 mb-4">
              <span className="text-success">PEOCHAIN</span>: Redefining Blockchain for the Next Generation
            </h1>
            <p className="lead mb-4 text-opacity-75">
              Advanced technology solving blockchain's biggest challenges—scalability, security, and decentralization.
            </p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Button 
                variant="success" 
                size="lg"
                onClick={onJoinClick}
                className="rounded-pill px-4 fw-medium"
                style={{
                  background: "linear-gradient(135deg, var(--bs-success) 0%, var(--bs-teal) 100%)"
                }}
              >
                Join the Waitlist
              </Button>
              <Button 
                variant="outline-secondary" 
                size="lg"
                onClick={onExploreClick}
                className="d-flex align-items-center justify-content-center gap-2 rounded-pill px-4"
              >
                Explore Features <ArrowRight size={18} className="ms-1" />
              </Button>
            </div>
          </Col>
          <Col lg={6} className="position-relative">
            <div className="shadow rounded-4 p-4 p-md-5 bg-white bg-opacity-75" 
              style={{
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(28, 130, 74, 0.1)"
              }}
            >
              <div className="ratio ratio-4x3">
                <div className="d-flex align-items-center justify-content-center bg-light rounded-3 shadow-sm p-3">
                  {/* Simple chart placeholder instead of AnimatedChart */}
                  <div className="w-100 h-100 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="badge bg-success-subtle text-success px-3 py-2 rounded-pill">⚡ PeoChain Performance</span>
                      <span className="badge bg-light text-secondary px-2 py-1">Live Data</span>
                    </div>
                    <div className="d-flex justify-content-around align-items-end flex-grow-1 pb-4">
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-success" style={{height: "120px", width: "30px", borderRadius: "4px 4px 0 0"}}></div>
                        <span className="mt-2 small">PeoChain</span>
                        <span className="small fw-semibold">85K TPS</span>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-warning" style={{height: "90px", width: "30px", borderRadius: "4px 4px 0 0"}}></div>
                        <span className="mt-2 small">Solana</span>
                        <span className="small fw-semibold">65K TPS</span>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-info" style={{height: "40px", width: "30px", borderRadius: "4px 4px 0 0"}}></div>
                        <span className="mt-2 small">Avalanche</span>
                        <span className="small fw-semibold">4.5K TPS</span>
                      </div>
                      <div className="d-flex flex-column align-items-center">
                        <div className="bg-danger" style={{height: "10px", width: "30px", borderRadius: "4px 4px 0 0"}}></div>
                        <span className="mt-2 small">Ethereum</span>
                        <span className="small fw-semibold">15 TPS</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-top">
                      <div className="d-flex justify-content-between">
                        <span className="small text-muted">Transaction Speed (TPS)</span>
                        <div className="d-flex gap-2 align-items-center">
                          <BarChart3 size={14} className="text-muted" />
                          <span className="small text-muted">Performance</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-success rounded-circle" style={{width: "12px", height: "12px", animation: "pulse 2s infinite"}}></div>
                  <span className="fw-medium">Coming Soon</span>
                </div>
                <div className="d-flex align-items-center gap-2 text-muted">
                  <ShieldCheck size={16} />
                  <span>Security Audited</span>
                </div>
              </div>
            </div>
            {/* Background decorative elements */}
            <div className="position-absolute" style={{bottom: "-24px", right: "-24px", width: "192px", height: "192px", background: "rgba(76, 175, 80, 0.2)", borderRadius: "50%", filter: "blur(40px)", zIndex: -1}}></div>
            <div className="position-absolute" style={{top: "-40px", left: "-40px", width: "288px", height: "288px", background: "rgba(0, 150, 136, 0.1)", borderRadius: "50%", filter: "blur(40px)", zIndex: -1}}></div>
          </Col>
        </Row>
      </Container>
      
      {/* Add some custom styles for the pulse animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
          }
          
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
          }
          
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
          }
        }
      `}} />
    </section>
  );
}